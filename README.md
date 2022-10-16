# mb-widgets
Widgets are components Plug'n Play that can be used among side the apps.
Widgets must be a [Factory](https://www.dofactory.com/javascript/design-patterns/factory-method) that provides a method **render**.

## Why?
Over time, a widget can be build in more than one framework, or even in different versions of the same framework.
So, the Factory pattern helps us to have several rendering methods and their specifics :grin:

### Requirements
- Each widget must have it's own gulp tasks
- Each task build output must be in `/public`
- Each widget must have it's on README.md explaining how to properly use it

## Widgets
- [[MBWD] Most Valued Assets](https://github.com/mercadobitcoin/mb-widgets/tree/mb-widgets/widgets/mbwd-most-valued-assets)
- [[MBWD] Assets](https://github.com/mercadobitcoin/mb-widgets/tree/mb-widgets/widgets/mbwd-assets)

## Start
```javascript
npm i
```

## Scripts

### Node Local Server
```javascript
// Up a node server on: localhost:3000
npm run start
```

### Gulp Commands
```javascript
// run all build taks
npm run build

// run all build tasks and watch for tasks
npm run dev
```

### Linters (Required: Run before each commit)
```javascript
// check for sintax errors
npm run lint

// check and fix fixable sintax errors
npm run lint:fix
```

## Workflows
- [GitHub Super Linter](https://github.com/github/super-linter)
- [CodeQL](https://docs.github.com/en/code-security/code-scanning/automatically-scanning-your-code-for-vulnerabilities-and-errors/about-code-scanning)
