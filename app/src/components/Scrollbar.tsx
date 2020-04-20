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
      noScrollX={true}
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
      contentProps={{
        renderer: (props) => {
          const { elementRef, style, ...restProps } = props;

          return (
            <div
              {...restProps}
              ref={elementRef}
              className={`ScrollbarsCustom-Content`}
              style={{
                ...style,
                // width: `calc(100% - 17px)`,
                // minWidth: `unset`,
              }}
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
