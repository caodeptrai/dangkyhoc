# SƠ ĐỒ BPMN CHO DRAW.IO
## Hệ thống Đăng ký Khóa học - Trung tâm Ngoại ngữ Hà Ninh

Dưới đây là hướng dẫn import vào draw.io:

## Cách import:

1. Mở **draw.io** (https://app.diagrams.net)
2. Chọn **File → Open → Device** (hoặc Ctrl+O)
3. Copy nội dung file `.xml` bên dưới, paste vào text editor, save với đuôi `.xml`
4. Open file đó trong draw.io

---

## 1. UC04 - Đăng ký khóa học

```xml
<mxfile host="app.diagrams.net" modified="2026-05-25T14:00:00.000Z" agent="Claude" version="24.0.0" type="device">
  <diagram name="UC04-DangKyKhoaHoc" id="uc04">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1100" pageHeight="850" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Swimlanes -->
        <mxCell id="swim1" value="HỌC VIÊN" style="swimlane;horizontal=0;strokeColor=#666666;fillColor=#f5f5f5;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="350" height="700" as="geometry" />
        </mxCell>
        <mxCell id="swim2" value="HỆ THỐNG" style="swimlane;horizontal=0;strokeColor=#666666;fillColor=#e3f2fd;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="370" y="20" width="350" height="700" as="geometry" />
        </mxCell>
        <mxCell id="swim3" value="ADMIN" style="swimlane;horizontal=0;strokeColor=#666666;fillColor=#fff3e0;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="720" y="20" width="350" height="700" as="geometry" />
        </mxCell>

        <!-- Start Event -->
        <mxCell id="start1" value="O&#xa;BẮT ĐẦU" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#4CAF50;fontColor=#FFFFFF;fontStyle=1" vertex="1" parent="swim1">
          <mxGeometry x="125" y="50" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Tasks -->
        <mxCell id="task1" value="Xem chi tiết&#xa;khóa học" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="140" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task2" value="Nhấn nút&#xa;&quot;Đăng ký&quot;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="230" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task3" value="Điền thông tin&#xa;đăng ký" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="320" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task4" value="Thông báo&#xa;Đăng ký thành công" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#4CAF50;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="560" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- End Event -->
        <mxCell id="end1" value="●&#xa;KẾT THÚC" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#F44336;fontColor=#FFFFFF;fontStyle=1" vertex="1" parent="swim1">
          <mxGeometry x="125" y="640" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- System Tasks -->
        <mxCell id="sys1" value="Hiển thị&#xa;form đăng ký" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="230" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="sys2" value="Kiểm tra&#xa;validation" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FF9800;fontColor=#FFFFFF;" vertex="1" parent="swim2">
          <mxGeometry x="75" y="400" width="200" height="80" as="geometry" />
        </mxCell>

        <mxCell id="sys3" value="Hiển thị&#xa;lỗi validation" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F44336;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="500" width="150" height="50" as="geometry" />
        </mxCell>

        <mxCell id="sys4" value="Tạo đơn&#xa;đăng ký" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="410" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="sys5" value="Lưu: Trạng thái&#xa;&quot;Chờ xác nhận&quot;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="480" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- Admin Task -->
        <mxCell id="adm1" value="Nhận thông báo&#xa;đơn mới" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#E65100;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim3">
          <mxGeometry x="100" y="480" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- Connections -->
        <mxCell id="conn1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="start1" target="task1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task1" target="task2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task2" target="sys1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;exitX=0.5;exitY=1;exitDx=0;exitDy=0;" edge="1" parent="swim1" source="task3" target="sys2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="380" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="conn5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;exitX=0.5;exitY=0;exitDx=0;exitDy=0;" edge="1" parent="swim1" source="task3" target="task3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="380" as="targetPoint" />
          </mxGeometry>
        </mxCell>
        <mxCell id="conn6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys1" target="task3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;entryX=0;entryY=0.5;entryDx=0;entryDy=0;" edge="1" parent="swim2" source="task3" target="sys2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;dashed=1;" edge="1" parent="swim2" source="sys2" target="sys3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="50" y="440" />
            </Array>
          </mxGeometry>
          <mxPoint x="75" y="525" as="targetPoint" />
          <mxLabel value="Không hợp lệ" style="resizable=1;align=left;verticalAlign=bottom;spacingLeft=5;fontColor=#F44336;fontSize=10;" />
        </mxCell>
        <mxCell id="conn9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys3" target="task3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="350" as="targetPoint" />
            <Array as="points">
              <mxPoint x="175" y="525" />
              <mxPoint x="175" y="350" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="conn10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys2" target="sys4">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="440" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Hợp lệ" style="resizable=1;align=left;verticalAlign=bottom;spacingLeft=5;fontColor=#4CAF50;fontSize=10;" />
        </mxCell>
        <mxCell id="conn11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys4" target="sys5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys5" target="task4">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="560" as="targetPoint" />
            <Array as="points">
              <mxPoint x="175" y="540" />
              <mxPoint x="30" y="540" />
              <mxPoint x="30" y="590" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="conn13" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task4" target="end1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="conn14" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;dashed=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;" edge="1" parent="swim2" source="sys5" target="adm1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="320" y="510" as="targetPoint" />
          </mxGeometry>
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## 2. UC11 - Đăng nhập Admin

```xml
<mxfile host="app.diagrams.net" modified="2026-05-25T14:00:00.000Z" agent="Claude" version="24.0.0" type="device">
  <diagram name="UC11-DangNhapAdmin" id="uc11">
    <mxGraphModel dx="1000" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="850" pageHeight="600" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Start Event -->
        <mxCell id="start" value="O&#xa;BẮT ĐẦU" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#4CAF50;fontColor=#FFFFFF;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="375" y="30" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Tasks -->
        <mxCell id="task1" value="Truy cập trang&#xa;đăng nhập" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="350" y="120" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task2" value="Hiển thị&#xa;form login" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="350" y="200" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task3" value="Nhập username&#xa;và password" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="350" y="280" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task4" value="Tạo JWT token&#xa;&amp; session" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#4CAF50;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="350" y="430" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task5" value="Chuyển hướng&#xa;Dashboard" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#4CAF50;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="350" y="510" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- End Event -->
        <mxCell id="end" value="●&#xa;KẾT THÚC" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#F44336;fontColor=#FFFFFF;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="375" y="590" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Gateway -->
        <mxCell id="gw1" value="Kiểm tra&#xa;thông tin?" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FF9800;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="325" y="360" width="200" height="80" as="geometry" />
        </mxCell>

        <!-- Error Tasks -->
        <mxCell id="err1" value="Tài khoản&#xa;không tồn tại" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F44336;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="100" y="360" width="120" height="50" as="geometry" />
        </mxCell>

        <mxCell id="err2" value="Mật khẩu&#xa;sai" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F44336;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="100" y="420" width="120" height="50" as="geometry" />
        </mxCell>

        <mxCell id="err3" value="Tài khoản&#xa;bị khóa" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F44336;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="100" y="480" width="120" height="50" as="geometry" />
        </mxCell>

        <mxCell id="retry" value="Quay lại nhập&#xa;(tối đa 3 lần)" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#9E9E9E;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="575" y="420" width="120" height="50" as="geometry" />
        </mxCell>

        <!-- Connections -->
        <mxCell id="c1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="start" target="task1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task1" target="task2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task2" target="task3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task3" target="gw1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw1" target="err1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="320" y="400" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Sai" style="resizable=1;align=center;verticalAlign=top;spacingLeft=5;fontColor=#F44336;fontSize=10;" />
        </mxCell>
        <mxCell id="c6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw1" target="err2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="320" y="400" as="targetPoint" />
            <Array as="points">
              <mxPoint x="300" y="400" />
            </Array>
          </mxGeometry>
          <mxLabel value="Sai" style="resizable=1;align=center;verticalAlign=bottom;spacingLeft=5;fontColor=#F44336;fontSize=10;" />
        </mxCell>
        <mxCell id="c7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw1" target="err3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="320" y="400" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Khóa" style="resizable=1;align=right;verticalAlign=bottom;spacingRight=5;fontColor=#F44336;fontSize=10;" />
        </mxCell>
        <mxCell id="c8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw1" target="task4">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="425" y="400" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="OK" style="resizable=1;align=center;verticalAlign=top;spacingLeft=5;fontColor=#4CAF50;fontSize=12;fontStyle=1;" />
        </mxCell>
        <mxCell id="c9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="err1" target="retry">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="err2" target="retry">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="err3" target="retry">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="retry" target="task3">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="635" y="280" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c13" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task4" target="task5">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c14" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task5" target="end">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## 3. UC15 - Quản lý đơn đăng ký

```xml
<mxfile host="app.diagrams.net" modified="2026-05-25T14:00:00.000Z" agent="Claude" version="24.0.0" type="device">
  <diagram name="UC15-QuanLyDonDangKy" id="uc15">
    <mxGraphModel dx="1200" dy="800" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1100" pageHeight="600" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Swimlanes -->
        <mxCell id="swim1" value="ADMIN" style="swimlane;horizontal=0;strokeColor=#666666;fillColor=#f5f5f5;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="20" y="20" width="350" height="520" as="geometry" />
        </mxCell>
        <mxCell id="swim2" value="HỆ THỐNG" style="swimlane;horizontal=0;strokeColor=#666666;fillColor=#e3f2fd;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="370" y="20" width="350" height="520" as="geometry" />
        </mxCell>
        <mxCell id="swim3" value="HỌC VIÊN" style="swimlane;horizontal=0;strokeColor=#666666;fillColor=#e8f5e9;fontStyle=1;fontSize=12;" vertex="1" parent="1">
          <mxGeometry x="720" y="20" width="350" height="520" as="geometry" />
        </mxCell>

        <!-- Start Event -->
        <mxCell id="start" value="O&#xa;BẮT ĐẦU" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#4CAF50;fontColor=#FFFFFF;fontStyle=1;align=center;" vertex="1" parent="swim1">
          <mxGeometry x="125" y="40" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Admin Tasks -->
        <mxCell id="task1" value="Chọn &quot;Quản lý&#xa;đăng ký&quot;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="130" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task2" value="Tải danh sách&#xa;đơn đăng ký" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="210" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task3" value="Chọn đơn và&#xa;cập nhật trạng thái" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="350" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task4" value="Thông báo&#xa;thành công" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#4CAF50;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="440" width="150" height="50" as="geometry" />
        </mxCell>

        <!-- End Event -->
        <mxCell id="end" value="●&#xa;KẾT THÚC" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#F44336;fontColor=#FFFFFF;fontStyle=1;align=center;" vertex="1" parent="swim1">
          <mxGeometry x="125" y="500" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- System Tasks -->
        <mxCell id="sys1" value="Hiển thị danh sách" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="210" width="150" height="50" as="geometry" />
        </mxCell>

        <mxCell id="sys2" value="Cập nhật CSDL" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="350" width="150" height="50" as="geometry" />
        </mxCell>

        <mxCell id="sys3" value="Refresh danh sách" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim2">
          <mxGeometry x="100" y="420" width="150" height="50" as="geometry" />
        </mxCell>

        <!-- Student Task -->
        <mxCell id="stu1" value="Nhận thông báo&#xa;kết quả" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2E7D32;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="swim3">
          <mxGeometry x="100" y="350" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- Gateway -->
        <mxCell id="gw1" value="Hành động?" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FF9800;fontColor=#FFFFFF;" vertex="1" parent="swim1">
          <mxGeometry x="100" y="280" width="150" height="70" as="geometry" />
        </mxCell>

        <!-- Connections -->
        <mxCell id="c1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="start" target="task1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task1" target="task2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task2" target="sys1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys1" target="gw1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="gw1" target="task3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="175" y="315" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Xác nhận / Từ chối / Hủy" style="resizable=1;align=left;verticalAlign=bottom;fontColor=#666666;fontSize=9;" />
        </mxCell>
        <mxCell id="c6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task3" target="sys2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys2" target="sys3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim2" source="sys3" target="task4">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;dashed=1;" edge="1" parent="swim2" source="sys2" target="stu1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="swim1" source="task4" target="end">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## 4. UC06 - Chatbot tư vấn

```xml
<mxfile host="app.diagrams.net" modified="2026-05-25T14:00:00.000Z" agent="Claude" version="24.0.0" type="device">
  <diagram name="UC06-Chatbot" id="uc06">
    <mxGraphModel dx="900" dy="700" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="900" pageHeight="650" math="0" shadow="0">
      <root>
        <mxCell id="0" />
        <mxCell id="1" parent="0" />

        <!-- Start Event -->
        <mxCell id="start" value="O&#xa;BẮT ĐẦU" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#4CAF50;fontColor=#FFFFFF;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="400" y="30" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Tasks -->
        <mxCell id="task1" value="Nhấn biểu tượng&#xa;chatbot" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="375" y="120" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task2" value="Hiển thị&#xa;cửa sổ chat" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="375" y="200" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task3" value="Nhập câu hỏi" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#2196F3;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="375" y="290" width="150" height="50" as="geometry" />
        </mxCell>

        <mxCell id="task4" value="Hiển thị phản hồi&#xa;chatbot" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#4CAF50;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="375" y="500" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="task5" value="Đóng cửa sổ chat" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#9E9E9E;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="375" y="580" width="150" height="50" as="geometry" />
        </mxCell>

        <!-- End Event -->
        <mxCell id="end" value="●&#xa;KẾT THÚC" style="ellipse;whiteSpace=wrap;html=1;strokeWidth=3;fillColor=#F44336;fontColor=#FFFFFF;fontStyle=1;align=center;" vertex="1" parent="1">
          <mxGeometry x="400" y="650" width="100" height="60" as="geometry" />
        </mxCell>

        <!-- Gateway 1: Check keyword -->
        <mxCell id="gw1" value="Gặp từ&#xa;khóa?" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FF9800;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="350" y="360" width="200" height="80" as="geometry" />
        </mxCell>

        <!-- Gateway 2: Continue -->
        <mxCell id="gw2" value="Tiếp tục&#xa;hỏi?" style="rhombus;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#FF9800;fontColor=#FFFFFF;" vertex="1" parent="1">
          <mxGeometry x="350" y="440" width="200" height="60" as="geometry" />
        </mxCell>

        <!-- Answer Tasks -->
        <mxCell id="ans1" value="Tìm câu trả lời&#xa;phù hợp" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#0D47A1;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="100" y="370" width="150" height="60" as="geometry" />
        </mxCell>

        <mxCell id="ans2" value="Trả lời mặc định:&#xa;&quot;Xin lỗi, tôi&#xa;chưa hiểu rõ ý bạn&quot;" style="rounded=1;whiteSpace=wrap;html=1;strokeWidth=2;fillColor=#F44336;fontColor=#FFFFFF;arcSize=15;" vertex="1" parent="1">
          <mxGeometry x="650" y="370" width="150" height="60" as="geometry" />
        </mxCell>

        <!-- Connections -->
        <mxCell id="c1" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="start" target="task1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c2" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task1" target="task2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c3" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task2" target="task3">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c4" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task3" target="gw1">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c5" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw1" target="ans1">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="350" y="400" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Khớp" style="resizable=1;align=center;verticalAlign=bottom;fontColor=#4CAF50;fontSize=10;" />
        </mxCell>
        <mxCell id="c6" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw1" target="ans2">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="550" y="400" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Không khớp" style="resizable=1;align=center;verticalAlign=bottom;fontColor=#F44336;fontSize=10;" />
        </mxCell>
        <mxCell id="c7" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="ans1" target="task4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="175" y="470" />
              <mxPoint x="450" y="470" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c8" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="ans2" target="task4">
          <mxGeometry relative="1" as="geometry">
            <Array as="points">
              <mxPoint x="725" y="470" />
              <mxPoint x="450" y="470" />
            </Array>
          </mxGeometry>
        </mxCell>
        <mxCell id="c9" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task4" target="gw2">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
        <mxCell id="c10" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw2" target="task3">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="450" y="470" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Có" style="resizable=1;align=right;verticalAlign=bottom;fontColor=#4CAF50;fontSize=10;" />
        </mxCell>
        <mxCell id="c11" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="gw2" target="task5">
          <mxGeometry relative="1" as="geometry">
            <mxPoint x="450" y="470" as="targetPoint" />
          </mxGeometry>
          <mxLabel value="Không" style="resizable=1;align=right;verticalAlign=bottom;fontColor=#9E9E9E;fontSize=10;" />
        </mxCell>
        <mxCell id="c12" style="edgeStyle=orthogonalEdgeStyle;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;endArrow=classic;" edge="1" parent="1" source="task5" target="end">
          <mxGeometry relative="1" as="geometry" />
        </mxCell>
      </root>
    </mxGraphModel>
  </diagram>
</mxfile>
```

---

## Hướng dẫn nhanh

### Cách 1: Import từng sơ đồ riêng lẻ

1. Copy code XML của từng sơ đồ
2. Paste vào text editor (Notepad, VS Code)
3. Save với tên `uc04.xml`, `uc11.xml`, etc.
4. Trong draw.io: **File → Open → từ file**

### Cách 2: Tạo tất cả trong 1 file

1. Copy tất cả các `<diagram>` blocks vào 1 file
2. Giữ nguyên cấu trúc `<mxfile>` ngoài cùng
3. Mỗi `<diagram>` = 1 tab trong draw.io

### Cách 3: Vẽ thủ công nhanh trong draw.io

Sử dụng các shapes có sẵn:

| Shape | BPMN tương đương |
|-------|------------------|
| Ellipse (stroke dày) | Start/End Event |
| Rectangle bo góc | Task |
| Diamond | Gateway |
| Swimlane | Pool/Lane |

---

## Chú thích màu sắc

| Màu | Ý nghĩa |
|-----|---------|
| 🟢 Xanh lá (#4CAF50) | Start Event, Success |
| 🔴 Đỏ (#F44336) | End Event, Error |
| 🔵 Xanh dương (#2196F3) | User Task |
| 🟣 Xanh navy (#0D47A1) | System Task |
| 🟠 Cam (#FF9800) | Gateway/Decision |
| ⚪ Xám (#9E9E9E) | End Process |
