# GetGro
Getgro is a modern customer experience platform to track, resolve and analyse customer support issues, faster. new account
### Setup Development Environment

```sh
# install dependent packages
yarn install

# start development server
yarn dev
# production build
yarn build
```

### Environment variables for Production Build
1. NODE_ENV=production
2. VITE_REST_URL=https://test.getgro.io/V1/
3. VITE_SUB_DOMAIN=https://intent.getgro.io/

### Sample development environment configuration
To use the configuration provided below, first create a file name ".env.development"

```env
NODE_ENV=development
VITE_REST_URL=https://test.getgro.io/V1/
VITE_SUB_DOMAIN=https://intent.getgro.io/
```

### Locales
**Generated Locale file from:** - https://translate.i18next.com/

### Branching Guidelines


**master** - is the main branch that contains production ready code. Direct merge to this branch is prohibited

**dev** - is the main branch that reflects code for the latest delivered development changes ready for next release

**hotfix-${HOTFIX-VERSION}** - is the main branch created from "master" that contains the code for a particular hotfix. Direct merge to this merge branch is prohibited. This branch code must then be merged to "master" tagged with "hotfix-version" 

**feature-${FEATURE-NAME}** - is the main branch for any new feature development that would be created from "dev" branch. Once the feature development is complete, the code will be merged back to "dev" branch through only pull request. 

**bug-${FEATURE-NAME}** - is the main branch for any new bug fixing that would be created from any of "master" or "dev" or "release" branches. Once the bux fixing is complete, the code will be merged back to the source branch through only pull request. 

Following naming conventions should be strictly followed for the new branches.

1. All branch names must be lower in case
2. If new feature to be developed, then a new branch must be created from "dev" branch with naming convention "feature-${feature-name}".
3. Bugs should be fixed in a separate branch and naming convention of such branches must be "bugfix-${bug-name}".
4. Pull requests must be raised to move feature or bug fixes to production
