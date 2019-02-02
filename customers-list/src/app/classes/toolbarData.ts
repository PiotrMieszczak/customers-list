export class ToolBarData {
  color: string;
  header: string

  constructor(header: string, color: string) {
    this.header = header || '';
    this.color = color || 'primary';
  }
}