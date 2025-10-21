interface LCNode {
  id: string;
  type: string; // component name
  props: Record<string, unknown>;
  style: {
    width?: number | string;
    height?: number | string;
    margin?: number | string;
    padding?: number | string;
  } & Record<string, any>;
  slots: Record<string, LCNode[] | undefined>;
  // 当前节点在父节点中的插槽位置标记（便于右侧修改 slot 位置）
  slot?: string;
}

interface ImportedApi {
  id: string;
  name: string;
  title: string;
  path: string;
  method: string;
  desc?: string;
  projectId: string;
  projectName: string;
  category: string; // 从API路径自动提取的分类，用于生成import路径
  serviceName?: string; // 用户可配置的服务名称，用于生成import路径
}

interface ComponentMeta {
  name: string; // component tag, e.g. 'u-title'
  title: string; // display name
  icon?: string;
  category?: string; // 分组：布局、表单、表格 等
  props: PropSchema[];
  slots?: string[];
  defaultProps?: Record<string, unknown>;
  component?: any;
  rightActions?: RightActionConfig[]; // 右键菜单配置
}

interface PageData {
  nodes: LCNode[];
  importedApis: ImportedApi[];
  //   componentMetaList: ComponentMeta[];
}
