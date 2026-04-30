import styles from './Container.module.css';

type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  const {container, content} = styles;
  return (
    <div className={container}>
      <div className={content}>
        {children}
      </div>
    </div>
  );
}
