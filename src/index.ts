/**
 * Initializes a widget by embedding an iframe into the document and setting up message event listeners.
 *
 * @param params - Configuration object for initializing the widget.
 * @param params.token - The authentication token required to initialize the widget.
 * @param params.widgetSource - The URL source of the widget.
 * @param params.onAccept - Callback function triggered when a message of type "accepted" is received.
 *                          Receives an object containing the type, message, and data with price and acceptance status.
 * @param params.onMessage - Optional callback function triggered when a message of type "message" is received.
 *                           Receives an object containing the type, message, and data with price and acceptance status.
 *
 * @example
 * ```typescript
 * initWidget({
 *   token: "your-auth-token",
 *   onAccept: (data) => {
 *     console.log("Accepted:", data);
 *   },
 *   onMessage: (data) => {
 *     console.log("Message received:", data);
 *   },
 * });
 * ```
 */
export const initWidget = ({
    token,
    widgetSource = "https://www.parleyai.net/widget",
    onAccept = () => { },
    onMessage = () => { },
}: {
    token: string;
    widgetSource?: string;
    onAccept: (data: {
        type: string;
        message: string;
        data: {
            price: number;
            accepted: boolean;
        },
    }) => void;
    onMessage?: (data: {
        type: string;
        message: string;
        data: {
            price: number;
            accepted: boolean;
        },
    }) => void;
}) => {
    const iframe = document.createElement('iframe');
    iframe.src = `${widgetSource}?token=${token}`;
    iframe.style.cssText = 'position:fixed;bottom:20px;right:20px;width:350px;height:500px;border:none;';
    document.body.appendChild(iframe);

    window.addEventListener('message', (event) => {
        const data = event.data as {
            token: string;
            type: string;
            message: string;
            data: {
                price: number;
                accepted: boolean;
            }
        };

        switch (data.type) {
            case "accepted":
                onAccept(data);
                break;

            case "message":
                onMessage(data);
                break;
        }
    });
}