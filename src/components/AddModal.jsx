
import { useState } from "react";

export default function AddModal({ hide, addTask }) {
    const [title, setTitle] = useState("");
    const [tasks, setTasks] = useState([""]); // Initialize with one empty task

    // Add a new task input field
    const addTasks = () => {
        setTasks([...tasks, ""]);
    };

    // Remove a task input field
    const removeTasks = (index) => {
        if (tasks.length > 1) {
            setTasks(tasks.filter((_, i) => i !== index));
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (!title.trim()) {
            alert("Please enter a title.");
            return;
        }

        const nonEmptyTasks = tasks.filter((task) => task.trim());
        if (nonEmptyTasks.length === 0) {
            alert("Please add at least one task.");
            return;
        }

        // Pass the title and tasks to the parent component
        addTask({ title, tasks: nonEmptyTasks });
        hide(); // Close the modal after submission
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-60">
            <div className="relative w-full max-w-md p-8 bg-white rounded-lg shadow-xl transform transition-all ease-in-out">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-3xl font-semibold text-indigo-700">Create New Task</h3>
                    <button
                        onClick={hide}
                        id="closeModalButton"
                        className="text-gray-500 hover:text-gray-700 transition duration-200"
                        aria-label="Close modal"
                    >
                        <svg
                            className="h-5 w-5 inline-block"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <div className="space-y-8">
                    {/* Title Input */}
                    <div>
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700">
                            Task Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter task title"
                            className="w-full mt-2 p-4 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                            aria-label="Task title"
                        />
                    </div>

                    {/* Tasks List */}
                    <div>
                        <label htmlFor="list" className="block text-lg font-medium text-gray-700">
                            Task List
                        </label>
                        <div className="space-y-6">
                            {tasks.map((task, index) => (
                                <div key={index} className="flex items-center space-x-4">
                                    <input
                                        type="text"
                                        value={task}
                                        onChange={(e) =>
                                            setTasks((prevTasks) =>
                                                prevTasks.map((t, i) =>
                                                    i === index ? e.target.value : t
                                                )
                                            )
                                        }
                                        placeholder={`Task ${index + 1}`}
                                        className="p-4 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
                                        aria-label={`Task ${index + 1}`}
                                    />
                                    {tasks.length > 1 && (
                                        <button
                                            onClick={() => removeTasks(index)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
                                            aria-label={`Delete task ${index + 1}`}
                                        >
                                            X
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Add Task Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={addTasks}
                            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200"
                            aria-label="Add another task"
                        >
                            Add Another Task
                        </button>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={handleSubmit}
                            className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                            aria-label="Submit task list"
                        >
                            Submit Task List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
