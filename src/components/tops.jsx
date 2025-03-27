import Account from "./account";
import TopNav from "./topNav";

export default function TopSection() {
    return (
        <div style={{ display: "flex", gap: "15px" }}>
            <TopNav />
            <Account />
        </div>
    );
}
