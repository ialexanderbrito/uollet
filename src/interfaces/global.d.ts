declare namespace React {
  export interface StatelessComponent<P = {}> {
    // define a propriedade 'propTypes'
    propTypes?: React.WeakValidationMap<P>;
    // define a propriedade 'contextTypes'
    contextTypes?: React.ValidationMap<any>;
    // define a propriedade 'defaultProps'
    defaultProps?: Partial<P>;
    // define a propriedade 'displayName'
    displayName?: string;
    (props: P, context?: any): React.ReactElement<any> | null;
  }
}
