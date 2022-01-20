#####################
### jsonnet convert to yaml
### command: dron jsonnet --steam
### 下完command後，會附蓋掉.drone.yml 
#####################
// 這塊目前不需使用
local conditionWhen(env="qa")= 
    (if env=="QA" then {
        branch: ["develop"],
        event: ["push"]
    }else if env=="prod" then {
        ref: ["refs/tags/Prod*"], 
    }
);

local conditionTrigger(env="qa",shortProduct="yb")= 
(
    if env =="QA" then {
        ref: ["refs/tags/"+ shortProduct + "QA-*"],
        event: ["tag"],
    }else if env=="Beta" then {
        ref: ["refs/tags/"+ shortProduct + "Beta-*"],
        event: ["tag"],
    }else if env== "Demo" then  {
        ref: ["refs/tags/"+ shortProduct + "Demo-*"], 
        event: ["tag"],
    }else if env=="Prod"  then  {
        ref: ["refs/tags/"+ shortProduct + "Prod-*"], 
        event: ["tag"],
    }    
);


local Pipeline(name="QA",cluster="xbb-common",zone="asia-east1-a",
env="qa",deployName="yaboxxx-landing-page-qa",nginxConfig="yaboxxx-landing-page-nginx"
,imageName="yaboxxx-landingpage",shortProduct="yb",nodePool="",nodePoolName="") = {
    kind: "pipeline",
    name: "yaboLandingPipeline("+ shortProduct + name +")",
    steps:[
        {
            
            name: "push2GCR-"+name,
            image: "plugins/gcr",
            depends_on: (if env=="prod" || env =="demo" then ["clone"]),
            settings: {
                repo: "gcr.io/rd7-project/"+imageName,
                tags: ["latest",env+"-${DRONE_COMMIT}","${DRONE_TAG}"],
                json_key: { "from_secret":"GOOGLE_CREDENTIALS"},
                build_args: ["website="+shortProduct],
            },
            // when :
            //     conditionWhen(env)
            // when:
            // {
            //     branch: ["develop"]                 
            //     event: ["push"],                
            // },
        },
        {
            name: "deploy2GKE-"+name,
            image: "nytimes/drone-gke",
            depends_on: (if env=="prod" || env =="demo" then ["push2GCR-"+name]),
            environment:{
                TOKEN: {"from_secret": "GOOGLE_CREDENTIALS"},                
            },
            settings:{
                project: "rd7-project",
                template:
                    "configs/"+ shortProduct+"/.istio-kube.yml",
                vars:
                    {"deployName":deployName,
                    "env":env,
                    "k8sNginxConfigMap":nginxConfig,
                    "imageName":"gcr.io/rd7-project/"+imageName+":${DRONE_TAG}",
                    "nodePool":nodePool,
                    "nodePoolName":nodePoolName,
                    }
                ,
                zone: zone,
                cluster: cluster,                    
            }, 
            // when :
            //     conditionWhen(env) 
        },
    ],
    trigger:
        conditionTrigger(name,shortProduct)
};

local onlyGKE(name="QA",cluster="xbb-common",zone="asia-east1-a"
,env="qa",deployName="yaboxxx-landing-page-qa",nginxConfig="yaboxxx-landing-page-nginx"
,imageName="yaboxxx-landingpage",shortProduct="yabo",nodePool="",nodePoolName="")={
    
    name: shortProduct + "GKE-"+ name,
    image: "nytimes/drone-gke",
    depends_on:  (if name=="Prod" || name =="Demo" then ["push2GCR-Prod"]
                    else ["push2GCR-"+name]
    ),
    environment:{
        TOKEN: {"from_secret": "GOOGLE_CREDENTIALS"},                
    },
    settings:{
        project: "rd7-project",
        template:
            "configs/"+ shortProduct+"/.istio-kube.yml",
        vars:
            {"deployName":deployName,
            "env":env,
            "k8sNginxConfigMap":nginxConfig,
            "imageName":"gcr.io/rd7-project/"+imageName+":${DRONE_TAG}",
            "nodePool":nodePool,
            "nodePoolName":nodePoolName,
            }
        ,
        zone: zone,
        cluster: cluster,                    
    }, 
        
};

local buildall(name="QA",shortProduct="yb")={
    kind: "pipeline",
    name: "AllPipeline("+ name +")",
    steps:[
    
        {
            name: "push2GCR-"+name,
            image: "plugins/gcr",
            depends_on: ["clone"],
            settings: {
                repo: "gcr.io/rd7-project/yaboxxx-landingpage",
                tags: ["latest","${DRONE_COMMIT}","${DRONE_TAG}"],
                json_key: { "from_secret":"GOOGLE_CREDENTIALS"},
                build_args: ["website="+shortProduct],
            },
        },
    ]+
    if name=="QA" then 
    [
        # istio-yabo
        onlyGKE("QA","yaboxxx-test","asia-east1-b"
        ,"qa","yabo-landingpage-qa","yabo-landingpage-nginx-qa"
        ,"yaboxxx-landingpage","yabo","env","qa"),
        
        # istio-aubo
        onlyGKE("QA","yaboxxx-test","asia-east1-b"
        ,"qa","aubo-landingpage-qa","aubo-landingpage-nginx-qa"
        ,"yaboxxx-landingpage","aubo","env","qa"),

        onlyGKE("QA","yaboxxx-test","asia-east1-b"
        ,"qa","sp51-landingpage-qa","sp51-landingpage-nginx-qa"
        ,"yaboxxx-landingpage","sp51","env","qa"),        

        onlyGKE("QA","yaboxxx-test","asia-east1-b"
        ,"qa","sigua-landingpage-qa","sigua-landingpage-nginx-qa"
        ,"yaboxxx-landingpage","sigua","env","qa"),


    ]else if name=="Beta" then  [
        # yabo
        onlyGKE("Beta","yaboxxx-prod","asia-east1-b",
        "beta","yabo-landingpage-beta","yabo-landingpage-nginx-beta"
        ,"yaboxxx-landingpage","yabo","env","prod"),

        onlyGKE("Beta","yaboxxx-test","asia-east1-b"
        ,"beta","sigua-landingpage-beta","sigua-landingpage-nginx-beta"
        ,"yaboxxx-landingpage","sigua","env","qa"),
            
    ]else if name=="Prod" then [
        # yabo
        onlyGKE("Demo","yaboxxx-prod","asia-east1-b"
        ,"demo","yabo-landingpage-demo","yabo-landingpage-nginx-demo"
        ,"yaboxxx-landingpage","yabo","env","prod"),

        onlyGKE("Prod","yaboxxx-prod","asia-east1-b"
        ,"prod","yabo-landingpage-prod","yabo-landingpage-nginx-prod"
        ,"yaboxxx-landingpage","yabo","env","prod"),
   
        # istio-aubo
        onlyGKE("Demo","yaboxxx-prod","asia-east1-b"
        ,"demo","aubo-landingpage-demo","aubo-landingpage-nginx-demo"
        ,"yaboxxx-landingpage","aubo","env","prod"),

        onlyGKE("Prod","yaboxxx-prod","asia-east1-b"
        ,"prod","aubo-landingpage-prod","aubo-landingpage-nginx-prod"
        ,"yaboxxx-landingpage","aubo","env","prod"),

        # istio-sp51
        onlyGKE("Demo","yaboxxx-prod","asia-east1-b"
        ,"demo","sp51-landingpage-demo","sp51-landingpage-nginx-demo"
        ,"yaboxxx-landingpage","sp51","env","prod"),

        onlyGKE("Prod","yaboxxx-prod","asia-east1-b"
        ,"prod","sp51-landingpage-prod","sp51-landingpage-nginx-prod"
        ,"yaboxxx-landingpage","sp51","env","prod"),

        # istio-sigua
        onlyGKE("Demo","yaboxxx-prod","asia-east1-b"
        ,"demo","sigua-landingpage-demo","sigua-landingpage-nginx-demo"
        ,"yaboxxx-landingpage","sigua","env","prod"),

        onlyGKE("Prod","yaboxxx-prod","asia-east1-b"
        ,"prod","sigua-landingpage-prod","sigua-landingpage-nginx-prod"
        ,"yaboxxx-landingpage","sigua","env","prod"),
        
    ],
    trigger:
        conditionTrigger(name,shortProduct)
    // trigger:
    //     ref: ["refs/heads/master"],
    //     event: ["tag"],

};

[
//     (name="QA"（環境),cluster="xbb-common"（叢集),zone="asia-east1-a"(區域),
// env="qa"(GKE的label),deployName="yaboxxx-landing-page-qa"(GKE的名稱),nginxConfig="nginx"(GKE的configMap,nginx設定檔名稱),
// imageName="yaboxxx-landingpage"(GCR映像檔名稱),shortProduct（產品縮寫)="yb",nodePool(選擇節點)="",nodePoolName(節點值)="")
    
    # note:  
    buildall("QA","all"),
    buildall("Beta","all"),
    buildall("Prod","all"),

    # istio yabo
    Pipeline("QA","yaboxxx-test","asia-east1-b"
    ,"qa","yabo-landingpage-qa","yabo-landingpage-nginx-qa"
    ,"yaboxxx-landingpage","yabo","env","qa"),
    
    Pipeline("Beta","yaboxxx-prod","asia-east1-b",
    "beta","yabo-landingpage-beta","yabo-landingpage-nginx-beta"
    ,"yaboxxx-landingpage","yabo","env","prod"),
 
    Pipeline("Demo","yaboxxx-prod","asia-east1-b"
    ,"demo","yabo-landingpage-demo","yabo-landingpage-nginx-demo"
    ,"yaboxxx-landingpage","yabo","env","prod"),

    Pipeline("Prod","yaboxxx-prod","asia-east1-b"
    ,"prod","yabo-landingpage-prod","yabo-landingpage-nginx-prod"
    ,"yaboxxx-landingpage","yabo","env","prod"),


    # istio aubo
    Pipeline("QA","yaboxxx-test","asia-east1-b"
    ,"qa","aubo-landingpage-qa","aubo-landingpage-nginx-qa"
    ,"yaboxxx-landingpage","aubo","env","qa"),
    
 
    Pipeline("Demo","yaboxxx-prod","asia-east1-b"
    ,"demo","aubo-landingpage-demo","aubo-landingpage-nginx-demo"
    ,"yaboxxx-landingpage","aubo","env","prod"),

    Pipeline("Prod","yaboxxx-prod","asia-east1-b"
    ,"prod","aubo-landingpage-prod","aubo-landingpage-nginx-prod"
    ,"yaboxxx-landingpage","aubo","env","prod"),



    # istio sp51
    Pipeline("QA","yaboxxx-test","asia-east1-b"
    ,"qa","sp51-landingpage-qa","sp51-landingpage-nginx-qa"
    ,"yaboxxx-landingpage","sp51","env","qa"),
    
 
    Pipeline("Demo","yaboxxx-prod","asia-east1-b"
    ,"demo","sp51-landingpage-demo","sp51-landingpage-nginx-demo"
    ,"yaboxxx-landingpage","sp51","env","prod"),

    Pipeline("Prod","yaboxxx-prod","asia-east1-b"
    ,"prod","sp51-landingpage-prod","sp51-landingpage-nginx-prod"
    ,"yaboxxx-landingpage","sp51","env","prod"),
 
    # istio sigua
    Pipeline("QA","yaboxxx-test","asia-east1-b"
    ,"qa","sigua-landingpage-qa","sigua-landingpage-nginx-qa"
    ,"yaboxxx-landingpage","sigua","env","qa"),

    Pipeline("Beta","yaboxxx-prod","asia-east1-b"
    ,"beta","sigua-landingpage-beta","sigua-landingpage-nginx-beta"
    ,"yaboxxx-landingpage","sigua","env","prod"),
    
 
    Pipeline("Demo","yaboxxx-prod","asia-east1-b"
    ,"demo","sigua-landingpage-demo","sigua-landingpage-nginx-demo"
    ,"yaboxxx-landingpage","sigua","env","prod"),

    Pipeline("Prod","yaboxxx-prod","asia-east1-b"
    ,"prod","sigua-landingpage-prod","sigua-landingpage-nginx-prod"
    ,"yaboxxx-landingpage","sigua","env","prod"),

]
