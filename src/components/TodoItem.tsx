import { deleteTodo, editTodo, toggleTodo } from "@/store/todoSlice"
import { Todo } from "@/types/todo"
import {
  ActionIcon,
  Box,
  Checkbox,
  Flex,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core"
import { IconTrash, IconEdit, IconCheck, IconX } from "@tabler/icons-react"
import dayjs from "dayjs"
import { useState } from "react"
import { useDispatch } from "react-redux"

const TodoItem = ({ todo }: { todo: Todo }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleSave = () => {
    if (editText.trim().length > 0) {
      dispatch(editTodo({ id: todo.id, text: editText }))
      setIsEditing(false)
    }
  }

  return (
    <Paper shadow="xs" p="md" radius="md" withBorder mb="sm">
      <Flex align="center" justify="space-between" gap="sm">
        <Flex align="center" gap="md" style={{ flex: 1 }}>
          <Checkbox
            checked={todo.completed}
            onChange={() => dispatch(toggleTodo(todo.id))}
            size="md"
          />

          <Box style={{ flex: 1 }}>
            {isEditing ? (
              <TextInput
                value={editText}
                onChange={e => setEditText(e.currentTarget.value)}
                onKeyDown={e => e.key === "Enter" && handleSave()}
              />
            ) : (
              <div>
                <Text
                  td={todo.completed ? "line-through" : "none"}
                  c={todo.completed ? "none" : "dimmed"}
                  fw={500}
                >
                  {todo.text}
                </Text>
                {todo.dueDate && (
                  <Text
                    size="xs"
                    c={
                      dayjs(todo.dueDate).isBefore(dayjs()) && !todo.completed
                        ? "red"
                        : "dimmed"
                    }
                  >
                    Due: {dayjs(todo.dueDate).format("MMM D, YYYY")}
                  </Text>
                )}
              </div>
            )}
          </Box>
        </Flex>

        <Group gap={5}>
          {isEditing ? (
            <>
              <ActionIcon color="green" variant="subtle" onClick={handleSave}>
                <IconCheck size={18} />
              </ActionIcon>
              <ActionIcon
                color="red"
                variant="light"
                onClick={() => setIsEditing(false)}
              >
                <IconX size={18} />
              </ActionIcon>
            </>
          ) : (
            <>
              <ActionIcon
                variant="subtle"
                color="blue"
                onClick={() => setIsEditing(true)}
              >
                <IconEdit size={18} />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="red"
                onClick={() => dispatch(deleteTodo(todo.id))}
              >
                <IconTrash size={18} />
              </ActionIcon>
            </>
          )}
        </Group>
      </Flex>
    </Paper>
  )
}

export default TodoItem
