"use client"

import { useState, useMemo } from "react"
import {
  Container,
  Title,
  TextInput,
  Button,
  Group,
  Paper,
  Text,
  ActionIcon,
  SegmentedControl,
  Badge,
  Transition,
  Stack,
  Flex,
  Box,
  useMantineColorScheme,
} from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store/store"
import { addTodo } from "@/store/todoSlice"
import { IconCalendar, IconSun, IconMoon } from "@tabler/icons-react"
import TodoItem from "./TodoItem"

export default function TodoApp() {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos.items)

  const { colorScheme, toggleColorScheme } = useMantineColorScheme()
  const isDark = colorScheme === "dark"

  const [inputValue, setInputValue] = useState("")
  const [dateValue, setDateValue] = useState<string | null>(null)
  const [filter, setFilter] = useState("all")
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState("")

  const pendingCount = todos.filter(t => !t.completed).length

  const filteredTodos = useMemo(() => {
    let result = [...todos]

    if (filter === "completed") result = result.filter(t => t.completed)
    if (filter === "pending") result = result.filter(t => !t.completed)

    return result.sort((a, b) => {
      if (a.completed === b.completed) {
        if (!a.dueDate) return 1
        if (!b.dueDate) return -1
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      }
      return a.completed ? 1 : -1
    })
  }, [todos, filter])

  const handleAdd = async () => {
    if (!inputValue.trim()) return

    setLoading(true)
    await new Promise(resolve => setTimeout(resolve, 750))

    const dueDateAsDate = dateValue ? new Date(dateValue) : null
    dispatch(addTodo({ text: inputValue, dueDate: dueDateAsDate }))
    setInputValue("")
    setDateValue(null)
    setLoading(false)
  }

  return (
    <Container size="sm" py="xl">
      <Stack gap="lg">
        {/* header */}
        <Flex
          justify="space-between"
          align="center"
          wrap="wrap"
          gap="md"
          mih={60}
        >
          <div>
            <Title order={3}>My Tasks</Title>
            <Text c="dimmed" size="sm">
              Manage your daily goals
            </Text>
          </div>

          <Flex align="center" justify="center" gap="md">
            <Badge
              size="lg"
              variant="filled"
              color={pendingCount > 0 ? "blue" : "green"}
              radius="xl"
            >
              {pendingCount} Pending {pendingCount === 1 ? "Task" : "Tasks"}
            </Badge>

            <ActionIcon
              onClick={() => toggleColorScheme()}
              size="lg"
              variant="subtle"
              color="gray"
              style={{ alignSelf: "center", cursor: "pointer" }}
            >
              {isDark ? (
                <IconSun size={22} stroke={1.5} />
              ) : (
                <IconMoon size={22} stroke={1.5} />
              )}
            </ActionIcon>
          </Flex>
        </Flex>

        {/* Input Section */}
        <Paper shadow="sm" p="lg" radius="md" withBorder>
          <Stack>
            <TextInput
              placeholder="Add your next goal…"
              value={inputValue}
              onChange={e => {
                setInputValue(e.currentTarget.value)
              }}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleAdd()}
              rightSection={
                loading && <ActionIcon loading variant="transparent" />
              }
            />

            <Group grow preventGrowOverflow={false}>
              <DateInput
                value={dateValue}
                onChange={setDateValue}
                placeholder="Due date (optional)"
                leftSection={<IconCalendar size={16} />}
                clearable
                minDate={new Date()}
              />
              <Button
                onClick={handleAdd}
                loading={loading}
                disabled={!inputValue.trim()}
              >
                Add Task
              </Button>
            </Group>
          </Stack>
        </Paper>

        {/* filters */}
        <SegmentedControl
          fullWidth
          value={filter}
          onChange={setFilter}
          data={[
            { label: "All", value: "all" },
            { label: "Pending", value: "pending" },
            { label: "Completed", value: "completed" },
          ]}
        />

        {/* item lists */}
        <Box>
          {filteredTodos.length === 0 ? (
            <Paper
              p="xl"
              withBorder
              bg="var(--mantine-color-body)"
              style={{ textAlign: "center" }}
            >
              <Text c="dimmed" size="lg">
                {filter === "all"
                  ? "No tasks yet!"
                  : filter === "pending"
                  ? "All caught up!"
                  : "No completed tasks yet."}
              </Text>
            </Paper>
          ) : (
            <Stack gap="xs">
              {filteredTodos.map(todo => (
                <Transition
                  key={todo.id}
                  mounted={true}
                  transition="fade"
                  duration={300}
                  timingFunction="ease"
                >
                  {styles => (
                    <div style={styles}>
                      <TodoItem todo={todo} />
                    </div>
                  )}
                </Transition>
              ))}
            </Stack>
          )}
        </Box>
      </Stack>
    </Container>
  )
}
