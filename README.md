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

## all

- 佈署到 QA，觸發條件：下 tag，tag 名稱前綴需為 【 allQA- 】（大小寫需一致）
  - git tag -a "allQA-v1.0.0" -m "allQA-v1.0.0"
  - git push origin master --tags
- 佈署到 Beta tag，tag 名稱前綴需為 【 allBeta- 】（大小寫需一致）
  - git tag -a "allBeta-v1.3.57" -m "allBeta-v1.3.57"
  - git push origin master --tags
- 佈署到 Prod , 觸發條件：下 tag，tag 名稱前綴需為 【 allProd- 】（大小寫需一致）
  - git tag -a "allProd-v0.1" -m "allProd-v0.0.1"
  - git push origin master --tags


## yabo 佈署方式

- 佈署到 QA，觸發條件：下 tag，tag 名稱前綴需為 【 yaboQA- 】（大小寫需一致）
  - git tag -a "yaboQA-v1.0.0" -m "yaboQA-v1.0.0"
  - git push origin master --tags
- 佈署到 Beta tag，tag 名稱前綴需為 【 yaboBeta- 】（大小寫需一致）
  - git tag -a "yaboBeta-v1.3.57" -m "yaboBeta-v1.3.57"
  - git push origin master --tags
- 佈署到 Demo tag，tag 名稱前綴需為 【 yaboDemo- 】（大小寫需一致）

  - git tag -a "yaboDemo-v1.3.57" -m "yaboDemo-v1.3.57"
  - git push origin master --tags

- 佈署到 Prod , 觸發條件：下 tag，tag 名稱前綴需為 【 yaboProd- 】（大小寫需一致）
  - git tag -a "yaboProd-v0.1" -m "yaboProd-v0.0.1"
  - git push origin master --tags

## aubo 佈署方式

- 佈署到 QA，觸發條件：下 tag，tag 名稱前綴需為 【 auboQA- 】（大小寫需一致）
  - git tag -a "auboQA-v1.0.0" -m "auboQA-v1.0.0"
  - git push origin master --tags

  - git tag -a "auboDemo-v1.3.57" -m "auboDemo-v1.3.57"
  - git push origin master --tags

- 佈署到 Prod , 觸發條件：下 tag，tag 名稱前綴需為 【 auboProd- 】（大小寫需一致）
  - git tag -a "auboProd-v0.1" -m "auboProd-v0.0.1"
  - git push origin master --tags