import { Group, MediaQuery, TextInput } from "@mantine/core";
import { FC, PropsWithChildren } from "react";
import { GoSearch } from "react-icons/go";

const FullWidthMobile: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MediaQuery smallerThan={"xs"} styles={{ width: "100%" }}>
      {children}
    </MediaQuery>
  );
};

interface ControlProps {
  search: {
    value: string;
    onChange: (
      value: string | React.ChangeEvent<any> | null | undefined
    ) => void;
  };
}

const Controls = (props: ControlProps) => {
  return (
    <FullWidthMobile>
      <Group spacing={"xs"}>
        <FullWidthMobile>
          <TextInput
            {...props.search}
            placeholder={"搜尋"}
            icon={<GoSearch />}
          />
        </FullWidthMobile>
      </Group>
    </FullWidthMobile>
  );
};

export default Controls;
