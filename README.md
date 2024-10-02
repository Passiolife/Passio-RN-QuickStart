# Welcome to quick start guide of react native Expo app 👋

### 1. Create .npmrc file and add at root level

 ```bash
//npm.pkg.github.com/:_authToken=YOUR_GITHUB_AUTH_TOKEN
@passiolife:registry=https://npm.pkg.github.com
```

or

#### Create .yarnrc.yml file and add at root level

```
nodeLinker: node-modules
npmScopes:
  passiolife:
    npmRegistryServer: "https://npm.pkg.github.com"
    npmAuthToken: "YOUR_GITHUB_AUTH_TOKEN"
yarnPath: .yarn/releases/yarn-4.3.1.cjs
```

### 2. Install dependencies

```bash
   yarn 
```

### 3. Create pre build

```bash
   npx expo prebuild --clean    
```

### 4. Install pod for IOS

```bash
cd ios && pod install && cd ..

```

### 5. Run on IOS

```bash
yarn ios
```

### 6. Run on android

```bash
yarn android
```

### 7. Create `key.ts` at root level and paste below code

```bash
export const PASSIO_KEY = "YOUR_PASSIO_KEY";
```
