import React from "react";
import { connect } from "react-redux";
import { AppDispatch } from "../redux/store";
import { errorActions } from "../redux/reducers/error";

interface Props {
  dispatch?: AppDispatch;
}
class ErrorBoundry extends React.Component<Props, { hasError: boolean }> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidCatch(error: any, info: any) {
    this.props?.dispatch?.(errorActions.setError({ error, info }));
    this.setState({
      hasError: true,
    });
    console.log(error, info);
  }
  render() {
    if (this.state.hasError)
      return (
        <div className="flex items-center justify-center h-screen">
          <div>
            <h1 className="text-5xl font-semibold text-center uppercase text-grey-900 opacity-80">
              Some Error Occured...
            </h1>
            <button
              onClick={() => window.location.reload()}
              className="p-3 mx-auto text-green-100 bg-green-500 hover:bg-green-700"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    return this.props.children;
  }
}
export default connect(null, null)(ErrorBoundry) as any;
