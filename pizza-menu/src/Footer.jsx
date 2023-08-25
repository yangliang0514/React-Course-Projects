export default function Footer() {
  const currentHour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = currentHour >= openHour && currentHour < closeHour;

  return (
    <footer className="footer">
      <div className="order">
        {isOpen ? (
          <>
            <p>
              We're open until {closeHour}:00. Come visit us or order online.
            </p>
            <button className="btn">Order</button>
          </>
        ) : (
          <p>
            Sorry we're closed. The store will be open between {openHour}:00 and{" "}
            {closeHour}:00
          </p>
        )}
      </div>
    </footer>
  );
}
