#!/bin/bash
set -e
cd /root/wedding-site/assets

declare -A ASSETS=(
  # hero (106:35)
  [flow4-default-vec.png]="https://www.figma.com/api/mcp/asset/57c3a6a8-bd0d-4cdf-8a6f-07196d991e29.png"
  [postcard-texture.png]="https://www.figma.com/api/mcp/asset/594ecdd3-be88-4d27-87ff-28a3b2223c05.png"
  [postcard-vsstamp.png]="https://www.figma.com/api/mcp/asset/7811ed9a-5971-4595-bff4-a2b0819d1fc1.png"
  [postcard-mask.svg]="https://www.figma.com/api/mcp/asset/22c38b1b-bf6d-464b-81dc-0985ee087aee.svg"
  [postcard-logomark.svg]="https://www.figma.com/api/mcp/asset/bb96ea07-2497-41bd-b73f-ae12bb7e045b.svg"
  [flow3-default-vec.png]="https://www.figma.com/api/mcp/asset/96541b9a-338a-43af-8675-018452ca1ec5.png"
  [flow3-bg.svg]="https://www.figma.com/api/mcp/asset/32a7b33b-4dc5-479a-b63a-cfed6bf4b6e2.svg"
  [flow2-bg.svg]="https://www.figma.com/api/mcp/asset/d098e499-ccd3-4118-a841-52d8fa7a4c0c.svg"
  [flow1-bg.svg]="https://www.figma.com/api/mcp/asset/4493e120-32e3-49c3-9216-3f1f4145fdfb.svg"
  [flow1-default-vec.png]="https://www.figma.com/api/mcp/asset/6debf58b-6714-4d97-97ec-ff76819d4175.png"
  [clouds-hero.png]="https://www.figma.com/api/mcp/asset/6649a124-e564-4401-94b6-2a083d0e9b5a.png"
  [sky-hero.png]="https://www.figma.com/api/mcp/asset/bb9a4a5a-5182-449e-be2b-b8cf923a3a34.png"
  [stamp-mumbai.png]="https://www.figma.com/api/mcp/asset/307c859e-e169-4f03-98fc-2b3b1298e32e.png"
  [cloud-front2-mumbai.png]="https://www.figma.com/api/mcp/asset/cf29c0aa-76f7-417c-a392-dcfc1274119b.png"
  [cloud-front-mumbai.png]="https://www.figma.com/api/mcp/asset/b4220972-6c72-445d-8297-6e02b7b15952.png"
  [stamp-pune.png]="https://www.figma.com/api/mcp/asset/9baae1ab-8690-4324-83f6-6116cef30f1e.png"
  [cloud-front-pune.png]="https://www.figma.com/api/mcp/asset/c49c9a55-9743-47a0-bab4-d9919ca79692.png"
  [cloud-back-toronto.png]="https://www.figma.com/api/mcp/asset/dd928a46-88fb-4407-8dd8-ab45c174df90.png"
  [stamp-toronto.png]="https://www.figma.com/api/mcp/asset/7139e0ec-9227-46a4-9986-f7829a4a28ed.png"
  [cloud-front-toronto.png]="https://www.figma.com/api/mcp/asset/54eb34f0-fa74-48f9-98ef-8a669e11ccc7.png"
  [cloud-back-sf.png]="https://www.figma.com/api/mcp/asset/36eb69cf-022b-4a3c-a363-6d4e79239e65.png"
  [stamp-sf.png]="https://www.figma.com/api/mcp/asset/9ce9be2e-b5fb-41df-af49-4708ca5795e5.png"
  [cloud-front-sf.png]="https://www.figma.com/api/mcp/asset/0f64dd82-74e3-4624-9d74-f024fac8b6af.png"
  [cloud-front2-sf.png]="https://www.figma.com/api/mcp/asset/9fce51ff-9e08-40a2-8116-8da0fe16df81.png"
  [cloud-bottom.png]="https://www.figma.com/api/mcp/asset/1eb1430c-48d6-4dbd-bc3e-5dcd58f35915.png"
  [logomark-v1.svg]="https://www.figma.com/api/mcp/asset/e80f4b25-41bc-424a-8dce-5e798106927d.svg"
  [logomark-v2.svg]="https://www.figma.com/api/mcp/asset/7cecdba1-47ca-44cd-b0b5-e76a830207b0.svg"
  # countdown (96:71)
  [plane-vec.svg]="https://www.figma.com/api/mcp/asset/2ad34c13-d451-4707-91be-601021cc1b94.svg"
  [plane-shape.svg]="https://www.figma.com/api/mcp/asset/862ef240-8019-481d-a7df-d92e672423aa.svg"
  [clouds-countdown.png]="https://www.figma.com/api/mcp/asset/9ae7a9be-efd4-44d6-9291-9e9f31ce1773.png"
  [sky-countdown.png]="https://www.figma.com/api/mcp/asset/1f8ee07b-67a5-47e1-84e9-fa629305783d.png"
  [cloud-bottom-countdown.png]="https://www.figma.com/api/mcp/asset/32b3e6e5-f337-4da9-91ca-d0d8e08e02ac.png"
  [cloud-back-sf-countdown.png]="https://www.figma.com/api/mcp/asset/e4637530-78ab-4caa-9a00-7bf013016971.png"
  [stamp-sf-countdown.png]="https://www.figma.com/api/mcp/asset/7238999a-6942-4816-a228-8dac1b4adb15.png"
  [cloud-front-sf-countdown.png]="https://www.figma.com/api/mcp/asset/96ddb44d-32bb-4c15-bb9b-491f094575ec.png"
  [cloud-front2-sf-countdown.png]="https://www.figma.com/api/mcp/asset/d7b247f2-9c65-451c-bc45-fe168bb69088.png"
  [logomark-v1-countdown.svg]="https://www.figma.com/api/mcp/asset/a006e2b1-3b4a-49f7-b43b-6bf1905487ba.svg"
  [logomark-v2-countdown.svg]="https://www.figma.com/api/mcp/asset/7af05906-ec36-4951-9b8a-598105cf6a34.svg"
  # flow1 full chain (65:375)
  [flow1-s1.png]="https://www.figma.com/api/mcp/asset/fcdca1c9-1f5c-4c32-af50-0e7ba42bdd52.png"
  [flow1-s2.png]="https://www.figma.com/api/mcp/asset/6c570975-49c8-4995-b862-ba467ab0432e.png"
  [flow1-s3.png]="https://www.figma.com/api/mcp/asset/e0000a52-09e6-46f9-98c1-4ffac5bce47f.png"
  [flow1-s4.png]="https://www.figma.com/api/mcp/asset/3a401996-c6b0-408c-b250-ab2366ff15e9.png"
  [flow1-s5.png]="https://www.figma.com/api/mcp/asset/254a9ef4-c3c2-44b9-a2db-6a03c1ff5446.png"
  [flow1-s6.png]="https://www.figma.com/api/mcp/asset/5aae3e4a-3d8a-495b-8e50-eef65c3a0c08.png"
  [flow1-s7.png]="https://www.figma.com/api/mcp/asset/7f8452e5-07bc-4e3a-bf07-0d2a135fa851.png"
  [flow1-s8.png]="https://www.figma.com/api/mcp/asset/0eb64aca-2ad4-4c87-b571-16a4eb1081fd.png"
  [flow1-s9.png]="https://www.figma.com/api/mcp/asset/a4053f33-51ab-45ea-b4cb-f796fe914f68.png"
  [flow1-bg2.svg]="https://www.figma.com/api/mcp/asset/3094053e-400b-4a0f-9c14-9175e40edc73.svg"
  [flow1-s9-extra.svg]="https://www.figma.com/api/mcp/asset/85421981-1b6b-42fb-880e-9412df151330.svg"
  [flow1-s10.svg]="https://www.figma.com/api/mcp/asset/1167208d-6b48-44f5-bf2e-31fca142db20.svg"
  # postcard content set (65:17)
  [pc-texture.png]="https://www.figma.com/api/mcp/asset/afe6eab6-4b56-4655-8868-883c6b689cb5.png"
  [pc-vsstamp.png]="https://www.figma.com/api/mcp/asset/e838942c-2dac-4255-957d-9e01635f837c.png"
  [pc-gemini.png]="https://www.figma.com/api/mcp/asset/efc15d54-217e-4bc2-9042-84d0bade99ca.png"
  [pc-mask1.svg]="https://www.figma.com/api/mcp/asset/b1044bd0-078a-4254-9297-9fabc5fde834.svg"
  [pc-logomark.svg]="https://www.figma.com/api/mcp/asset/08995ca1-0bde-4975-988b-8710c8955890.svg"
  [pc-polygon1.svg]="https://www.figma.com/api/mcp/asset/09b15605-bd77-4d61-95a9-617591920056.svg"
  [pc-mask3.svg]="https://www.figma.com/api/mcp/asset/466f9197-ecab-46f0-9f99-0f453679cbe9.svg"
  [pc-union.svg]="https://www.figma.com/api/mcp/asset/5f668c72-4bcf-4b5b-b856-5e34afd0a739.svg"
  [pc-mask4.svg]="https://www.figma.com/api/mcp/asset/57bb7325-33e6-463e-b332-9a7720bc1ac2.svg"
  [pc-mask5.svg]="https://www.figma.com/api/mcp/asset/ab779688-4107-4985-b551-a9e7ee79021f.svg"
  [pc-ganesh-group.svg]="https://www.figma.com/api/mcp/asset/f48ab988-cff2-4268-bccf-7e07f86d6c8b.svg"
  [pc-mask6.svg]="https://www.figma.com/api/mcp/asset/b97b2b06-36dd-4bf0-9e60-3875aaa3b849.svg"
  [pc-mask7.svg]="https://www.figma.com/api/mcp/asset/c618e6dd-0ef2-43d4-b48d-ee81ae249c16.svg"
  [pc-mask8.svg]="https://www.figma.com/api/mcp/asset/c61e16c5-1b4c-440b-a530-b86bafba6b85.svg"
  [pc-mask9.svg]="https://www.figma.com/api/mcp/asset/ce326ca1-db8c-404b-ae23-7f67f4af71d3.svg"
  [pc-line3.svg]="https://www.figma.com/api/mcp/asset/729486cd-a6bd-435e-a168-3b15c3e6fa83.svg"
  [pc-mask10.svg]="https://www.figma.com/api/mcp/asset/36d42cc2-2f9f-4893-a79d-1cde8b3ebfb8.svg"
  [pc-union1.svg]="https://www.figma.com/api/mcp/asset/c894ba43-930f-4cf2-9241-496c97c5c77a.svg"
  [pc-mask11.svg]="https://www.figma.com/api/mcp/asset/b45f7e9a-cf5a-4dad-9354-e6b5de1bbfdd.svg"
  [pc-qr-group1.svg]="https://www.figma.com/api/mcp/asset/fdc7c3fa-86bd-4ce4-a47a-92045d7e9b66.svg"
  [pc-qr-group2.svg]="https://www.figma.com/api/mcp/asset/80914e64-60ce-49a5-be80-4b596ff82b32.svg"
  [pc-qr-group3.svg]="https://www.figma.com/api/mcp/asset/c01e2bf6-7129-4855-af46-716f759e85a0.svg"
  [pc-qr-union.svg]="https://www.figma.com/api/mcp/asset/a861b98b-6ec7-42b8-97a7-1a550ba5b3e0.svg"
  # flow2 full chain (65:472)
  [flow2-bg2.svg]="https://www.figma.com/api/mcp/asset/1c0d5fe2-ab60-48b7-a61a-d211a6414a47.svg"
  [flow2-s1.svg]="https://www.figma.com/api/mcp/asset/b6ac8783-ddfd-488b-a62e-f2f1f0a822fd.svg"
  [flow2-s2.svg]="https://www.figma.com/api/mcp/asset/4e9c41b9-aee1-4462-9c19-9d780579f2ec.svg"
  [flow2-s3.svg]="https://www.figma.com/api/mcp/asset/8038fb89-3c9b-41e5-95be-2c11bf93f704.svg"
  [flow2-s4.svg]="https://www.figma.com/api/mcp/asset/947cb28c-3789-4f74-8f3d-72f969513439.svg"
  # flow3 full chain (103:397)
  [flow3-s1.png]="https://www.figma.com/api/mcp/asset/6b867d69-b9c2-4603-b212-c6c99b4399ab.png"
  [flow3-s2.png]="https://www.figma.com/api/mcp/asset/57c99570-d7eb-434e-a938-f1570e558da9.png"
  [flow3-s3.png]="https://www.figma.com/api/mcp/asset/e54d3bf3-7a97-4262-beec-84c0985011fb.png"
  [flow3-bg2.svg]="https://www.figma.com/api/mcp/asset/2607d760-0980-413c-8b95-23120845b675.svg"
  # flow4 full chain (103:408)
  [flow4-s1.png]="https://www.figma.com/api/mcp/asset/aaddcd57-5bd4-48a3-ae1f-b5333a563039.png"
  [flow4-s2.png]="https://www.figma.com/api/mcp/asset/1c2e9f6b-c8cf-401d-bca4-09fa294ddb4b.png"
)

total=${#ASSETS[@]}
count=0
failed=0
for name in "${!ASSETS[@]}"; do
  count=$((count+1))
  url="${ASSETS[$name]}"
  if curl -sL -f -o "$name" "$url"; then
    :
  else
    echo "FAILED: $name <- $url"
    failed=$((failed+1))
  fi
done
echo "Downloaded $((count-failed))/$total (failed: $failed)"
