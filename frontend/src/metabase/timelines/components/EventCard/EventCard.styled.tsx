import styled from "@emotion/styled";
import { color } from "metabase/lib/colors";
import Icon from "metabase/components/Icon";

export const CardRoot = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 5rem;
`;

export const CardThread = styled.div`
  display: flex;
  flex: 0 1 auto;
  flex-direction: column;
  align-items: center;
`;

export const CardThreadIcon = styled(Icon)`
  color: ${color("brand")};
  width: 1rem;
  height: 1rem;
`;

export const CardThreadIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  height: 2rem;
  border: 1px solid ${color("border")};
  border-radius: 1rem;
`;

export const CardThreadStroke = styled.div`
  flex: 1 1 auto;
  border-left: 1px solid ${color("border")};
`;

export const CardBody = styled.div`
  padding: 0 0.75rem;
`;

export const CardTitle = styled.div`
  color: ${color("text-dark")};
  font-size: 1rem;
  line-height: 1.25rem;
  font-weight: bold;
`;
