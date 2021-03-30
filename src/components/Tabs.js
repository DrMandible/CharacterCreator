import * as SC from "../styled";

export const Tabs = ({ tabLabels, activeTab, setActiveTab }) => {
  const handleTabClick = (tab_label) => {
    setActiveTab(tab_label);
  };

  return (
    <div className="d-flex w" style={{ position: "relative" }}>
      <SC.SolidBackground
        className="w bdr-b"
        style={{
          margin: 0,
          padding: 0,
          position: "sticky",
          top: 0
        }}
      >
        <div className="d-flex w">
          {tabLabels.map((tab_label) => {
            return (
              <SC.SmallButton
                onClick={(e) => handleTabClick(tab_label)}
                className="p-1 m-1"
                key={tab_label}
                isactive={activeTab === tab_label}
              >
                {tab_label}
              </SC.SmallButton>
            );
          })}
        </div>
      </SC.SolidBackground>
    </div>
  );
};
