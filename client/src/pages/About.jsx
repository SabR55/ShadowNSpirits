

function About(){
    return(
        <div>
            <div className="pt-32 text-white">
                <p className="pb-12">Info about the project</p>

                <p>Functions: </p>
                <ul className="pb-12">
                    <li>Make a reservation</li>
                    <li>View reservation</li>
                    <li>Edit</li>
                    <li>Delete</li>
                </ul>

                <p>Pages</p>
                <ul className="pb-12">
                    <li>Homepage</li>
                    <li>Drinks Page</li>
                    <li>Check Reservation</li>
                </ul>
            </div>
        </div>
    );
}

export default About;