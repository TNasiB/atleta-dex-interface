import { Token } from "@atleta-chain/sdk-core";

import S from "./TokenCard.module.scss";

interface TokenCardProps extends React.ComponentPropsWithoutRef<"button"> {
  token: Token;
}

const TokenCard = ({ token, ...props }: TokenCardProps) => {
  return (
    <button className={S.card} {...props}>
      <span>{token.symbol}</span> <span>{token.address}</span>
    </button>
  );
};

export default TokenCard;
