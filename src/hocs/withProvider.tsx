export const withProvider = <T extends object, K extends object>(
  Component: React.ComponentType<T>,
  Provider: React.ComponentType<React.PropsWithChildren<K>>,
  providerProps?: K
): React.FC<T> => {
  const _providerProps = providerProps ?? ({} as K);
  return (props: T) => (
    <Provider {..._providerProps}>
      <Component {...props} />
    </Provider>
  );
};
