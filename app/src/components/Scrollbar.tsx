import React, { Children } from 'react';
import Scrollbars from 'react-scrollbars-custom';

interface Props {
  styles?: any;
  children: React.ReactNode | Array<React.ReactNode>;
}

const Scrollbar: React.FC<Props> = ({ styles = {}, children }) => {
  return (
    <Scrollbars
      style={styles as any}
      trackYProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className='trackY'
              style={{
                ...style,
                backgroundColor: 'transparent',
                right: 4,
                width: 4,
              }}
            />
          );
        },
      }}
      thumbYProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;
          return (
            <div
              {...restProps}
              ref={elementRef}
              className='thumbY'
              style={{ ...style, backgroundColor: `#171e26`, opacity: 0.2 }}
            />
          );
        },
      }}
      wrapperProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;

          return (
            <div
              {...restProps}
              ref={elementRef}
              className='thumbY'
              style={{ ...style, right: 0 }}
            />
          );
        },
      }}
    >
      {children}
    </Scrollbars>
  );
};

export default Scrollbar;
