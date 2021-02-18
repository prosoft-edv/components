export interface IComponent {
  name: string;
  description: string;
  routerLink: string[];
}

export const components: IComponent[] = [
  {
    name: 'Form',
    description: `
      <strong><i>TODO</i></strong>
    `,
    routerLink: ['form'],
  },
  {
    name: 'Form Field',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['form-field'],
  },
  {
    name: 'Form Errors',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['form-errors'],
  },
  {
    name: 'Savebar',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['savebar'],
  },
  {
    name: 'Select',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['select'],
  },
  {
    name: 'Number Input',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['number-input'],
  },
  {
    name: 'Slider',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['slider'],
  },
  {
    name: 'Flip container',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['flip-container'],
  },
  {
    name: 'Block Ui',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['block-ui'],
  },
  {
    name: 'Table',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['table'],
  },
  {
    name: 'View',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['view'],
  },
  {
    name: 'Card',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['card'],
  },
  {
    name: 'Header',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['header'],
  },
  {
    name: 'Dialog wrapper',
    description: `
    <strong><i>TODO</i></strong>
    `,
    routerLink: ['dialog-wrapper'],
  },
].sort((a, b) => a.name.localeCompare(b.name));
