import EmptyState from "../_components/EmptyState";
import { getCurrentUser } from "../actions/getCurrentUser";

const Home = async () => {
  const { currentUserPrisma } = await getCurrentUser()

  return (
    <div className="h-screen bg-gray-200">
      <EmptyState user={currentUserPrisma} />
    </div>
  )
}

export default Home;