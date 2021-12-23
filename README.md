- ## Develop

```sh
nvm use 14.15
```

```sh
yarn start
```

- ## Build

```sh
yarn build
```

- ## Site

```sh
幣發 porn1
```

```sh
泡泡 sg1
```

```sh
澳博 aobo1
```

```sh
51國際 sp1
```




## yabo 佈署方式

- 佈署到 QA，觸發條件：下 tag，tag 名稱前綴需為 【 porn1QA- 】（大小寫需一致）
  - git tag -a "porn1QA-v1.0.0" -m "porn1QA-v1.0.0"
  - git push origin master --tags
- 佈署到 Beta tag，tag 名稱前綴需為 【 porn1Beta- 】（大小寫需一致）
  - git tag -a "porn1Beta-v1.3.57" -m "porn1Beta-v1.3.57"
  - git push origin master --tags
- 佈署到 Demo tag，tag 名稱前綴需為 【 porn1Demo- 】（大小寫需一致）

  - git tag -a "porn1Demo-v1.3.57" -m "porn1Demo-v1.3.57"
  - git push origin master --tags

- 佈署到 Prod && Demo, 觸發條件：下 tag，tag 名稱前綴需為 【 porn1Prod- 】（大小寫需一致）
  - git tag -a "porn1Prod-v0.1" -m "porn1Prod-v0.0.1"
  - git push origin master --tags
