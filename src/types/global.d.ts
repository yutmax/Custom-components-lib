import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
