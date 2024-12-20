import { AddCircle, EditNote, HighlightOff } from '@mui/icons-material';
import { Checkbox, TextField, Typography } from '@mui/material';
import { KeyCodes } from 'lib/enums';
import { CustomIconButton, FlexBox } from 'lib/ui-ux';
import { generateId } from 'lib/utils';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

import { ChartContainer } from './total-disposed';

interface IToDoList {
  task: string;
  id: string;
}

const TaskWrapper = styled(FlexBox)`
  cursor: pointer;
  border-bottom: 1px solid #ebeff3;
  padding: 2px;
`;

const TaskContent = styled.div`
  position: relative;
  width: 100%;
`;

const TaskOperations = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  padding-left: 5px;
  background: white;
`;

const StyledTaskDesc = styled(Typography)<{ $isChecked: boolean }>`
  && {
    text-decoration: ${({ $isChecked }) =>
      $isChecked ? 'line-through' : 'none'};
    color: ${({ $isChecked }) => ($isChecked ? '#9b9b9b' : 'unset')};
  }
  width: 100%;
  word-break: break-word;
`;

export const ToDoList = () => {
  const [textValue, setTextValue] = useState('');
  const [list, setList] = useState<IToDoList[]>([]);

  const handleAddTask = useCallback(() => {
    setList((prevList) => [...prevList, { task: textValue, id: generateId() }]);
    setTextValue('');
  }, [textValue]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.key === KeyCodes.EnterKey) {
      handleAddTask();
    }
  };

  const handleDelete = useCallback(
    (taskId: string) => {
      setList(list.filter((task) => task.id !== taskId));
    },
    [list]
  );

  const editTaskText = (id: string, text: string) => {
    setList(
      list.map((data) => (data.id === id ? { ...data, task: text } : data))
    );
  };

  return (
    <ChartContainer flexDirection="column" gap="10px">
      <Typography variant="h5">To-do({list.length})</Typography>
      <FlexBox width="100%" gap="10px" alignItems="center">
        <CustomIconButton
          onClick={handleAddTask}
          iconComponent={<AddCircle color="success" />}
          tooltipProps={{ title: 'Add' }}
        />
        <TextField
          onChange={(e) => setTextValue(e.target.value)}
          onKeyDown={handleKeyDown}
          value={textValue}
          size="small"
          variant="standard"
          fullWidth
          placeholder="Add to-do"
        />
      </FlexBox>
      <FlexBox flexDirection="column">
        {list.map((data, index) => (
          <RenderTask
            task={data.task}
            taskId={data.id}
            key={index}
            handleDelete={handleDelete}
            editTaskText={editTaskText}
          />
        ))}
      </FlexBox>
    </ChartContainer>
  );
};

interface IRenderTaskProps {
  task: string;
  taskId: string;
  handleDelete: (taskDesc: string) => void;
  editTaskText: (id: string, text: string) => void;
}

const RenderTask = (props: IRenderTaskProps) => {
  const { handleDelete, task, taskId, editTaskText } = props;
  const [isChecked, setIsChecked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isTaskOpShown, setIsTaskOpShown] = useState(false);
  const [editText, setEditText] = useState(task);

  const checkBoxOnChange = useCallback(() => {
    setIsChecked((prevVal) => !prevVal);
  }, []);

  const handleMouseOver = () => {
    setIsTaskOpShown(true);
  };

  const handleMouseOut = () => {
    setIsTaskOpShown(false);
  };

  const toggleEditView = useCallback(() => {
    setIsEditing((prevVal) => !prevVal);
  }, []);

  const onEditKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (ev) => {
    if (ev.key === KeyCodes.EnterKey) {
      editTaskText(taskId, editText);
      toggleEditView();
    }
  };

  return (
    <TaskWrapper
      justifyContent="space-between"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      width="100%"
    >
      {isEditing ? (
        <TextField
          defaultValue={task}
          onKeyDown={onEditKeyDown}
          onBlur={toggleEditView}
          variant="standard"
          size="medium"
          fullWidth
          onChange={(e) => {
            setEditText(e.target.value);
          }}
          inputProps={{ style: { fontSize: '13px' } }}
        />
      ) : (
        <TaskContent>
          <FlexBox alignItems="center" width="100%">
            <Checkbox
              checked={isChecked}
              onChange={checkBoxOnChange}
              size="small"
            />
            <StyledTaskDesc variant="body3" $isChecked={isChecked}>
              {' '}
              {task}{' '}
            </StyledTaskDesc>
          </FlexBox>
          {isTaskOpShown && (
            <TaskOperations
              flexDirection="row"
              alignItems="center"
              height="100%"
            >
              <CustomIconButton
                iconComponent={<EditNote fontSize="small" />}
                tooltipProps={{ title: 'Edit' }}
                size="small"
                onClick={toggleEditView}
              />
              <CustomIconButton
                iconComponent={<HighlightOff fontSize="small" />}
                tooltipProps={{ title: 'Delete' }}
                size="small"
                onClick={() => handleDelete(taskId)}
              />
            </TaskOperations>
          )}
        </TaskContent>
      )}
    </TaskWrapper>
  );
};
