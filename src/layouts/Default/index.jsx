import classNames from "classnames";
import "./LayoutDefault.scss";
import Header from "@components/Header";
import Main from "@components/Main";
import BarBottom from "@components/BarBottom";
import { useTranslation } from "react-i18next";

function LayoutDefault({ type, children }) {
  const [t] = useTranslation();
  return (
    <div
      className={classNames(
        "layout-default",
        `layout-default--${type ? type : "default"}`
      )}
    >
      <Header title={type ? t(`title.${type}`) : null} />
      <Main>{children}</Main>
      <BarBottom />
    </div>
  );
}

export default LayoutDefault;
