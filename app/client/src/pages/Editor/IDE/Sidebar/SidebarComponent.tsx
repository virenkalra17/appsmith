import React from "react";
import styled from "styled-components";
import SidebarButton from "./SidebarButton";
import type { SidebarButton as SidebarButtonType } from "@appsmith/entities/IDE/constants";
import { SideButtonType } from "@appsmith/entities/IDE/constants";
import { useSelector } from "react-redux";
import { getDatasources } from "@appsmith/selectors/entitiesSelector";

const Container = styled.div`
  width: 50px;
  border-right: 1px solid var(--ads-v2-color-border);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: var(--ads-v2-color-bg);
  position: relative;
`;

interface SidebarComponentProps {
  topButtons: SidebarButtonType[];
  bottomButtons: SidebarButtonType[];
  appState: string;
  onClick: (suffix: string) => void;
}

function SidebarComponent(props: SidebarComponentProps) {
  const { appState, bottomButtons, onClick, topButtons } = props;
  const datasources = useSelector(getDatasources);
  const getConditionalIconAndTooltip = (
    type?: SideButtonType,
    conditionTooltip?: string,
  ) => {
    switch (type) {
      case SideButtonType.DATSOURCE:
        if (datasources.length === 0)
          return {
            conditionIcon: "warning",
            tooltip: conditionTooltip,
          };
        return {};
      default:
        return {};
    }
  };

  return (
    <Container className="t--sidebar" id="t--app-sidebar">
      <div>
        {topButtons.map((b) => (
          <SidebarButton
            icon={b.icon}
            key={b.state}
            onClick={() => {
              if (appState !== b.state) {
                onClick(b.urlSuffix);
              }
            }}
            selected={appState === b.state}
            title={b.title}
            {...getConditionalIconAndTooltip(
              b.conditionType,
              b.conditionTooltip,
            )}
          />
        ))}
      </div>
      <div>
        {bottomButtons.map((b) => (
          <SidebarButton
            icon={b.icon}
            key={b.state}
            onClick={() => {
              if (appState !== b.state) {
                onClick(b.urlSuffix);
              }
            }}
            selected={appState === b.state}
            tooltip={b.title}
          />
        ))}
      </div>
    </Container>
  );
}

export default SidebarComponent;
