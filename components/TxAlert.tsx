import React from "react"

const TxAlert = (props: { message: string }) => {
    const { message } = props
    return (
        <div>
            <div
                className="shadow-lg alert alert-success"
                style={{
                    position: "fixed",
                    top: "85%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "calc(50vw - 20px)",
                }}
            >
                <div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 stroke-current flex-shrink-10"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span>{message}</span>
                </div>
            </div>
        </div>
    )
}

export default TxAlert
