import React, { useEffect, useRef } from 'react';

export type useDocumentTitleProps = {
  title?: string;
};

export default function useDocumentTitle({ ...props }: useDocumentTitleProps) {
  const titleRef = useRef(document.title);

  useEffect(() => {
    const originalTitle = titleRef.current;
    document.title = props.title ? props.title : originalTitle;
    return () => {
      document.title = originalTitle;
    };
  }, [props.title]);
}
