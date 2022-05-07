/* eslint-disable no-ternary */
import { FC } from 'react';

type Props = {
  value: string | null;
  highlight: boolean;
  onClick: () => void;
};

const Square: FC<Props> = (props) => {
  const { value, highlight, onClick } = props;
  const buttonClassName = highlight ? 'square-highlight' : 'square';

  return (
    <button
      key={value}
      type="button"
      className={buttonClassName}
      onClick={() => onClick()}
    >
      {value}
    </button>
  );
};

export default Square;
