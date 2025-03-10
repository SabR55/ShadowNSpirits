import ReservationBtn from "../ReservationBtn";

function Homepage(){

    return (
        <div className="pt-24">

            <h1>Homepage</h1>
            
            {/* <div style={{height:'1000px'}}></div> */}
           
            <div id="reservationBtn" className="fixed z-10">
                <ReservationBtn />
            </div>

        </div>
    )
}

export default Homepage;