import ClickOut from '../index';

const element = (v) => document.querySelector(v);
const TEMPLATE = `
  <section id="target">
    <div>in <span>target</span></div>
  </section>
  <section id="out">
    <div>out <span>element</span></div>
  </section>
`;

describe('ClickOut', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should be defined', () => {
    expect(ClickOut).toBeDefined();
    expect(ClickOut['name']).toBe('ClickOut');
  });

  test('should has 3 public static methods', () => {
    expect(ClickOut.bind).toBeDefined();
    expect(ClickOut.bindCustomEvent).toBeDefined();
    expect(ClickOut.destroy).toBeDefined();
  });

  test('should has 3 private static methods', () => {
    expect(ClickOut['[[Core]]']).toBeDefined();
    expect(ClickOut['[[Event]]']).toBeDefined();
    expect(ClickOut['[[Element]]']).toBeDefined();
  });

  describe('.bind', () => {
    test('should bind clickout synthetic event', () => {
      document.body.innerHTML = TEMPLATE;
      let isClickedOut = null;
      let eventType = null;

      ClickOut.bind('#target', (e) => {
        isClickedOut = true;
      });

      isClickedOut = false;
      element('#out')['click']();
      expect(isClickedOut).toBe(true);

      isClickedOut = false;
      element('#target')['click']();
      expect(isClickedOut).toBe(false);

      element('#target div')['click']();
      expect(isClickedOut).toBe(false);

      element('#out span')['click']();
      expect(isClickedOut).toBe(true);
    });

    test('should return destroy function', () => {
      document.body.innerHTML = TEMPLATE;
      let isClickedOut = null;

      const destroy = ClickOut.bind('#target', (e) => {
        isClickedOut = true;
      });

      isClickedOut = false;
      element('#out')['click']();
      expect(isClickedOut).toBe(true);

      isClickedOut = false;
      element('#target')['click']();
      expect(isClickedOut).toBe(false);

      destroy();
      element('#out')['click']();
      expect(isClickedOut).toBe(false);
    })
  });

  describe('.bindCustomEvent', () => {
    test('should bind clickout synthetic event', () => {
      document.body.innerHTML = TEMPLATE;
      let isClickedOut = null;
      let eventType = null;

      ClickOut.bindCustomEvent('#target');
      element('#target').addEventListener('clickout', (e) => {
        isClickedOut = true;
        eventType = e.type;
      });

      isClickedOut = false;
      element('#out')['click']();
      expect(isClickedOut).toBe(true);
      expect(eventType).toBe('clickout');

      isClickedOut = false;
      element('#target')['click']();
      expect(isClickedOut).toBe(false);

      element('#target div')['click']();
      expect(isClickedOut).toBe(false);

      element('#out span')['click']();
      expect(isClickedOut).toBe(true);
      expect(eventType).toBe('clickout');
    });

    test('should return destroy function', () => {
      document.body.innerHTML = TEMPLATE;
      let isClickedOut = null;

      const destroy = ClickOut.bindCustomEvent('#target');
      element('#target').addEventListener('clickout', (e) => {
        isClickedOut = true;
      });

      isClickedOut = false;
      element('#out')['click']();
      expect(isClickedOut).toBe(true);

      isClickedOut = false;
      element('#target')['click']();
      expect(isClickedOut).toBe(false);

      destroy();
      element('#out')['click']();
      expect(isClickedOut).toBe(false);
    });
  });

  describe('.destroy', () => {
    test('should destroy clickout synthetic event', () => {
      document.body.innerHTML = TEMPLATE;
      let isClickedOut = null;

      ClickOut.bind('#target', () => {
        isClickedOut = true;
      });

      isClickedOut = false;
      element('#out')['click']();
      expect(isClickedOut).toBe(true);

      isClickedOut = false;
      element('#target')['click']();
      expect(isClickedOut).toBe(false);

      ClickOut.destroy('#target');

      element('#out')['click']();
      expect(isClickedOut).toBe(false);
    });
  })
});
