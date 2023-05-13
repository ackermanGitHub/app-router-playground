import AddToDo from "@/components/AddToDo";
import ToDos from "@/components/ToDos";


export default function Home() {
    return (
        <div className="container mx-auto">
            <AddToDo />
            <ToDos />
        </div>
    )
}

