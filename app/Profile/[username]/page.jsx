const page = async ({ params }) => {
    const {username}=await params
    console.log(username);

    return (
        <div>

            <h1 style={{
                margin:"0 auto",
                transform:"translateY(40vh)"
            }}>This is Profile/ {username}</h1>

        </div>
    )
}

export default page
