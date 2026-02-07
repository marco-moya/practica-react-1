export const useNavigate = () => jest.fn();
export const BrowserRouter = ({ children }) => <div>{children}</div>;
export const Link = ({ children, to, ...props }) => <a href={to} {...props}>{children}</a>;
