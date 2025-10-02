export const useBackdrop = () => {
  const visible = useState("backdrop-visible", () => false);

  const open = () => (visible.value = true);
  const close = () => (visible.value = false);
  const toggle = () => (visible.value = !visible.value);

  return { visible, open, close, toggle };
};
