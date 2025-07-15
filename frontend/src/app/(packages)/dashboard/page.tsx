import AppAreaChart from "@/components/common/AppAreaChart";
import AppBarChart from "@/components/common/AppBarChart";
import AppPieChart from "@/components/common/AppPieChart";
import CardList from "@/components/common/CardList";
import TodoList from "@/components/common/TodoList";

const Dashboard = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-4">
            <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
                <AppBarChart />
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg">
                <CardList title="Latest Transactions" />
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg">
                <AppPieChart />
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg"><TodoList /></div>
            <div className="bg-primary-foreground p-4 rounded-lg lg:col-span-2 xl:col-span-1 2xl:col-span-2">
                <AppAreaChart />
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg">
                <CardList title="Popular Content" />
            </div>
        </div>
    );
};

export default Dashboard;