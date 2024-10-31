// 点击外部区域关闭弹框指令
export const clickOutside = {
  mounted(el:any, binding:any) {
    const handleClickOutside = (event:any) => {
      if (!el.contains(event.target) && el !== event.target) {
        binding.value();
      }
    };
    document.addEventListener('click', handleClickOutside);
    el._clickOutsideHandler = handleClickOutside;
  },
  unmounted(el:any) {
    document.removeEventListener('click', el._clickOutsideHandler);
  }
};

// 自动聚焦指令
export const autoFocus = {
  mounted(el:any) {
    el.focus();
  }
};

// 导出自定义指令
export function registerCustomDirectives(app:any) {
  app.directive('click-outside', clickOutside);
  app.directive('auto-focus', autoFocus);
}
