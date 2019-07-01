import React, { forwardRef, memo, useRef } from "react";
import { shallow } from "enzyme";

describe("enzyme", () => {
  it("debugs correctly with a shallow memo'ed SFC", () => {
    const Component = () => <h1>Hello world!</h1>;
    const MemoComponent = memo(Component);
    const Container = () => (
      <div>
        <MemoComponent />
      </div>
    );
    expect(shallow(<Container />).debug()).toMatchInlineSnapshot(`
            "<div>
              <Memo(Component) />
            </div>"
        `);
  });

  it("debugs correctly with a shallow forwarded ref SFC", () => {
    const Component = forwardRef((props, ref) => (
      <h1 ref={ref}>Hello world!</h1>
    ));
    const Container = () => {
      const headingRef = useRef(null);
      return (
        <div>
          <Component ref={headingRef} />
        </div>
      );
    };
    expect(shallow(<Container />).debug()).toMatchInlineSnapshot(`
      "<div>
        <ForwardRef />
      </div>"
    `);
  });

  it("debugs correctly with a shallow memo'ed forwarded ref SFC", () => {
    const Component = forwardRef((props, ref) => (
      <h1 ref={ref}>Hello world!</h1>
    ));
    const MemoComponent = memo(Component);
    const Container = () => {
      const headingRef = useRef(null);
      return (
        <div>
          <MemoComponent ref={headingRef} />
        </div>
      );
    };
    expect(shallow(<Container />).debug())
      .toMatchInlineSnapshot(
    `
      "<div>
        <Memo(ForwardRef) />
      </div>"
    `);
  });
});
