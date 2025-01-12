import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Button from '@/components/Button';

type Props = {
  label: string;
  selected: boolean;
  setChoice: (value: number) => void;
  id: number;
};

export default function VoteButton({ label, selected, setChoice, id}: Props) {
  const [icon, setIcon] = useState<keyof typeof MaterialCommunityIcons.glyphMap>('checkbox-blank-outline');

  useEffect(() => {
    if (!selected) setIcon('checkbox-blank-outline');
  }, [selected]);

  return (
    // <Button label="hi" icon='ab-testing' action={() => undefined} />
    <Button style={styles.button} label={id + '. ' + label} icon={icon} active={selected} action={() => {
        setIcon('checkbox-marked');
        setChoice(id);
    }} />
  )
}

const styles = StyleSheet.create({
    button: {
      textAlign: 'left',
      // alignContent: 'flex-start',
      // justifyContent: 'flex-start',
      width: '100%',
    },
})