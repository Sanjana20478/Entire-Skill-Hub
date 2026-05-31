import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import IdeaCard from "../components/IdeaCard";

const Recommendations = () => {
  const [ideas, setIdeas] = useState([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const { data } = await api.get("/users/recommendations");
    setIdeas(data);
  };

  useEffect(() => {
    load();
  }, []);

  const filtered = ideas.filter((idea) => idea.title.toLowerCase().includes(search.toLowerCase()));

  const bookmark = async (id) => {
    await api.post(`/users/bookmarks/${id}`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-ink">Business Idea Recommendations</h1>
      <div className="mt-5 flex max-w-md items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
        <Search className="h-4 w-4 text-slate-400" />
        <input className="w-full outline-none" placeholder="Search ideas" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {filtered.map((idea) => <IdeaCard key={idea._id} idea={idea} onBookmark={bookmark} />)}
      </div>
      {filtered.length === 0 && <p className="mt-6 text-slate-500">Add skills and interests in your profile to get matches.</p>}
    </div>
  );
};

export default Recommendations;
