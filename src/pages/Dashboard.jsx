function Dashboard() {
  return (
    <div style={styles.container}>
      <h1>Welcome to RetailSync 🛍️</h1>
      <p>Dashboard Loaded Successfully</p>
      <button onClick={() => {
  localStorage.removeItem("token");
  window.location.href = "/";
}}>
  Logout
</button>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
  },
};

export default Dashboard;