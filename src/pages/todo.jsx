import { useEffect, useState } from "react";
import axios from "axios";
import AddModal from "../components/AddModal";

function Todo() {
    const [titles, setTitles] = useState([]);  // To store titles fetched from the API
    const [showModal, setShowModal] = useState(false);  // Controls modal visibility

    // Fetch titles on component mount
    useEffect(() => {
        const getTitles = async () => {
            try {
                const response = await axios.get(`${process.env.ENDPOINT_URL}/get-titles`);
                setTitles(response.data.titles);
            } catch (error) {
                console.error("Error fetching titles:", error);
            }
        };
        getTitles();
    }, []);

    // The tasks data (could be dynamic or fetched as well)
    const [tasks, setTasks] = useState({
        ongoing: ["task 1", "task 2", "task 3"],
        done: [" "],
    });

    // Function to add a task to the ongoing list
    const addTask = (task) => {
        setTasks((prevTasks) => ({
            ...prevTasks,
            ongoing: [...prevTasks.ongoing, task],  // Adds the new task to the ongoing category
        }));
    };

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-purple-500">
            <div className="w-xl h-[500px] bg-purple-400 flex flex-col justify-center p-5 gap-5 rounded-4xl">
                <h2 className="text-5xl mx-5 py-5 text-center font-bold text-red-900">TO-DO LIST</h2>
                <div className="grid grid-cols-2 gap-5 w-full max-w-4xl">
                    {/* Loop through the categories: ongoing and done */}
                    {Object.keys(tasks).map((category) => (
                        <div key={category} className="bg-purple-300 p-4 rounded-lg shadow-md w-full">
                            <h3 className="text-xl font-bold">{category.toUpperCase()}</h3>
                            <ul className="space-y-2">
                                {/* Display tasks for this category */}
                                {tasks[category].map((task, index) => (
                                    <li key={index} className="p-2 bg-purple-200 rounded-lg text-center">
                                        {task}
                                    </li>
                                ))}
                            </ul>

                            {/* Add Task Button inside the Ongoing category */}
                            {category === "ongoing" && (
                                <div className="flex justify-center mt-5">
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="bg-purple-600 text-white py-2 px-4 rounded-full shadow-lg"
                                    >
                                        Add Task
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Modal Component - toggled based on showModal state */}
            {showModal && <AddModal hide={() => setShowModal(false)} addTask={addTask} />}
        </div>
    );
}

export default Todo;
