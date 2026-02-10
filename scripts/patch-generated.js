/**
 * orval 실행 후 생성된 API 코드를 React Native 환경에 맞게 패치합니다.
 *
 * [문제] React Native의 FormData에서 문자열을 append하면 Content-Type이
 *        application/octet-stream으로 전송됩니다. Spring Boot의 @RequestPart는
 *        JSON 파트에 application/json을 요구하므로 415 UNSUPPORTED_MEDIA_TYPE 발생.
 *
 * [수정] request 파트를 Blob({ type: 'application/json' })으로 감싸서 전송.
 */
const fs = require("fs");
const path = require("path");

const PATCHES = [
  {
    file: "src/api/customer-support.ts",
    description: "createInquiry request 파트 Content-Type 수정 (octet-stream → application/json)",
    from: "formData.append(`request`, JSON.stringify(createInquiryBody.request));",
    to: "formData.append(`request`, new Blob([JSON.stringify(createInquiryBody.request)], { type: 'application/json' }));",
  },
];

let anyPatched = false;

for (const patch of PATCHES) {
  const filePath = path.resolve(__dirname, "..", patch.file);

  if (!fs.existsSync(filePath)) {
    console.warn(`[patch-generated] 파일 없음, 스킵: ${patch.file}`);
    continue;
  }

  const original = fs.readFileSync(filePath, "utf-8");

  if (!original.includes(patch.from)) {
    console.log(`[patch-generated] 이미 패치됨 또는 대상 없음, 스킵: ${patch.description}`);
    continue;
  }

  const patched = original.replace(patch.from, patch.to);
  fs.writeFileSync(filePath, patched, "utf-8");
  console.log(`[patch-generated] 패치 완료: ${patch.description}`);
  anyPatched = true;
}

if (!anyPatched) {
  console.log("[patch-generated] 패치할 항목 없음");
}
