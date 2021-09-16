import { Flex, Text, Input } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface AnalysisParameters {
  name: string;
  vmin: string;
  vmax: string;
  unit: string;
  result: string;
  isAproved: boolean;
}

interface AnalysisData {
  setParameters: Dispatch<SetStateAction<AnalysisParameters[]>>;
  param: AnalysisParameters;
}

const AnalysisDetailsInput = ({ setParameters, param }: AnalysisData) => {
  return (
    <>
      <Flex direction={["column", "row", "row"]}>
        <Text
          flex="1"
          align="center"
          borderBottom="2px"
          fontWeight="semibold"
          m="2"
        >
          {param.name}
        </Text>
        <Text
          flex="1"
          align="center"
          borderBottom="2px"
          fontWeight="semibold"
          m="2"
        >
          {param.vmin}
        </Text>
        <Text
          flex="1"
          align="center"
          borderBottom="2px"
          fontWeight="semibold"
          m="2"
        >
          {param.vmax}
        </Text>
        <Text
          flex="1"
          align="center"
          borderBottom="2px"
          fontWeight="semibold"
          m="2"
        >
          {param.unit}
        </Text>
        <Input
          variant="flushed"
          flex="1"
          align="center"
          borderBottom="2px"
          fontWeight="semibold"
          m="2"
          textAlign="center"
          value={param.result}
          onChange={(e) => {}}
        />
        {console.log(param)}
      </Flex>
    </>
  );
};
export default AnalysisDetailsInput;

// const task = tasks.find((task) => task.id === taskId);
// const filteredTasks = tasks.filter((task) => task.id !== taskId);
//           if (task) {
//             task.completed = true;
//             setTasks([...filteredTasks, task]);
//           }

// param.result = e.target.value
