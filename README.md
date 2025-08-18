# Innowise Lab Internship: Custom Components Library
### Task
[Link to the assignment](https://drive.google.com/file/d/1C148FRnWfXVoRDslDWcYac3bEhebdIAV/view)

### Installation
Install the package in your React application:

```bash
npm install custom-companent-lib
```
### Usage
Basic Import
```jsx
import { Button } from 'custom-companent-lib';

function App() {
  return <Button variant="contained">Click me</Button>;
}
```

### Available Components
The library includes the following components:

- Button

- Checkbox

- Modal

- Select

- Switch

- TextField

### Dependencies
This library has peer dependencies:

```json
"peerDependencies": {
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0"
}
```
**Make sure to have them installed in your project.**

### Styling
Styles are automatically injected when components are imported. For custom styling, you can import:

```js
import 'custom-companent-lib/dist/styles.css';
```
### TypeScript Support
The library includes TypeScript type declarations out of the box.