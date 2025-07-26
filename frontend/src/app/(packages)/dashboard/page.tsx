import AppAreaChart from "@/components/common/AppAreaChart";
import AppBarChart from "@/components/common/AppBarChart";
import AppPieChart from "@/components/common/AppPieChart";
import CardList from "@/components/common/CardList";
import TodoList from "@/components/common/TodoList";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
      <div className="bg-primary-foreground p-4 rounded-sm shadow-md lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppBarChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-sm shadow-md">
        <CardList title="Latest Transactions" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-sm shadow-md">
        <AppPieChart />
      </div>
      <div className="bg-primary-foreground p-4 rounded-sm shadow-md">
        <TodoList />
      </div>
      <div className="bg-primary-foreground p-4 rounded-sm shadow-md">
        <CardList title="Popular Content" />
      </div>
      <div className="bg-primary-foreground p-4 rounded-sm shadow-md lg:col-span-2 xl:col-span-1 2xl:col-span-2">
        <AppAreaChart />
      </div>
    </div>
  );
};

export default Dashboard;
