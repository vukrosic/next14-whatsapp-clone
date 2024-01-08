import EmptyState from "../_components/EmptyState";
import getContacts from "../actions/getContacts";
import getUsers from "../actions/getUsers";

const Home = async () => {
  const users = await getUsers()
  const contacts = await getContacts()

  return (
    <div className="h-full bg-gray-200">
      <EmptyState users={users} contacts={contacts} />
    </div>
  )
}

export default Home;