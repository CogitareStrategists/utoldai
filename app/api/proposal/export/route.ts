import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";

type TextBlock = {
  id: string;
  type: "text";
  title: string;
  content: string;
};

type CoverBlock = {
  id: string;
  type: "cover";
  title: string;
  subtitle: string;
  preparedFor: string;
  preparedBy: string;
  companyLogo?: string;
  clientLogo?: string;
};

type TableBlock = {
  id: string;
  type: "table";
  title: string;
  columns: string[];
  rows: string[][];
};

type ProposalBlock = TextBlock | CoverBlock | TableBlock;

function sanitizeFilename(value: string) {
  return (value || "Proposal")
    .replace(/[^a-z0-9-_ ]/gi, "")
    .replace(/\s+/g, "_")
    .slice(0, 80);
}

function dataUrlToBuffer(dataUrl?: string) {
  if (!dataUrl || !dataUrl.includes(",")) return null;
  const [meta, base64] = dataUrl.split(",");
  const mime = meta.match(/data:(.*?);base64/)?.[1] || "";
  const extension = mime.includes("png") ? "png" : mime.includes("jpeg") || mime.includes("jpg") ? "jpg" : "";
  if (!extension) return null;
  return {
    buffer: Buffer.from(base64, "base64"),
    extension,
  };
}

function emptyLine() {
  return new Paragraph({ text: "", spacing: { after: 160 } });
}

function paragraphFromText(text: string) {
  const lines = String(text || "").split("\n");
  return lines.map((line) =>
    new Paragraph({
      children: [new TextRun({ text: line || " ", size: 22 })],
      spacing: { after: 120 },
    })
  );
}

function heading(text: string) {
  return new Paragraph({
    text,
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 260, after: 140 },
  });
}

function buildLogoParagraph(dataUrl: string | undefined, fallback: string) {
  const logo = dataUrlToBuffer(dataUrl);

  if (!logo) {
    return new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: fallback || "Logo", bold: true, size: 20 })],
    });
  }

  return new Paragraph({
    alignment: AlignmentType.CENTER,
    children: [
      new ImageRun({
        data: logo.buffer,
        transformation: {
          width: 120,
          height: 55,
        },
        type: logo.extension as "png" | "jpg",
      }),
    ],
  });
}

function coverPage(block: CoverBlock) {
  return [
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      borders: {
        top: { style: BorderStyle.NONE },
        bottom: { style: BorderStyle.NONE },
        left: { style: BorderStyle.NONE },
        right: { style: BorderStyle.NONE },
        insideHorizontal: { style: BorderStyle.NONE },
        insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [buildLogoParagraph(block.companyLogo, block.preparedBy)],
            }),
            new TableCell({
              width: { size: 50, type: WidthType.PERCENTAGE },
              children: [buildLogoParagraph(block.clientLogo, block.preparedFor)],
            }),
          ],
        }),
      ],
    }),
    new Paragraph({ text: "", spacing: { after: 1200 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "PROPOSAL", bold: true, size: 26, color: "1D4ED8" })],
      spacing: { after: 240 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: block.title || "Consultancy Proposal", bold: true, size: 46 })],
      spacing: { after: 180 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: block.subtitle || "", size: 28, color: "667085" })],
      spacing: { after: 720 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Prepared for: ${block.preparedFor || ""}`, size: 22 })],
      spacing: { after: 120 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `Prepared by: ${block.preparedBy || ""}`, size: 22 })],
      pageBreakBefore: false,
    }),
    new Paragraph({ text: "", pageBreakBefore: true }),
  ];
}

function tableBlock(block: TableBlock) {
  const rows = [
    new TableRow({
      tableHeader: true,
      children: block.columns.map(
        (column) =>
          new TableCell({
            shading: { fill: "F2F4F7" },
            children: [new Paragraph({ children: [new TextRun({ text: column, bold: true, size: 21 })] })],
          })
      ),
    }),
    ...block.rows.map(
      (row) =>
        new TableRow({
          children: row.map(
            (cell) =>
              new TableCell({
                children: [new Paragraph({ children: [new TextRun({ text: cell || " ", size: 20 })] })],
              })
          ),
        })
    ),
  ];

  return [
    heading(block.title),
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows,
    }),
    emptyLine(),
  ];
}

export async function POST(request: Request) {
  const body = await request.json();
  const blocks = (body.blocks || []) as ProposalBlock[];
  const proposalInput = body.proposalInput || {};
  const children: any[] = [];

  for (const block of blocks) {
    if (block.type === "cover") {
      children.push(...coverPage(block));
    }

    if (block.type === "text") {
      children.push(heading(block.title));
      children.push(...paragraphFromText(block.content));
      children.push(emptyLine());
    }

    if (block.type === "table") {
      children.push(...tableBlock(block));
    }
  }

  const doc = new Document({
    creator: "UToldAI",
    title: `Proposal for ${proposalInput.client || "Client"}`,
    description: "Generated by UToldAI Proposal Associate",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 900,
              right: 900,
              bottom: 900,
              left: 900,
            },
          },
        },
        children,
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const filename = `Proposal_${sanitizeFilename(proposalInput.client || "Client")}.docx`;

  return new Response(new Uint8Array(buffer), {
    status: 200,
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
